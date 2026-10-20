import express, { type NextFunction, type Request, type Response } from "express";
import morgan from "morgan";
import { config } from "./config";
import { getAvgTemp, getTempStatus, HttpError } from "./utils";
import { OSEMTempSensors } from "./data";
import pkg from "../package.json" with { type: 'json' }
import * as client from "@prometheus-io/client";

const app = express();
const ApiRouter = express.Router();

ApiRouter.get("/", (_req: Request, res: Response) => {
  res.json({ "message": `Hello to ${pkg.name ?? "Brix"}` });
});

ApiRouter.get("/info", (_req: Request, res: Response) => {
  res.json({
    "app_name": pkg.name ?? "Brix",
    "version": pkg.version,
    "environment": config.env,
  });
});

ApiRouter.get("/version", (_req: Request, res: Response) => {
  res.json({ "version": pkg.version });
});

ApiRouter.get("/temperature", async (_req: Request, res: Response) => {
  // Express 5 catches errors ands sends them to the global error handler so no need to use try-catch blocks
  const avg = await getAvgTemp(OSEMTempSensors);
  const status = getTempStatus(avg);

  res.json({ "averageTemperature": avg, status });
});

const register = new client.Registry();
client.collectDefaultMetrics({ register });

ApiRouter.get("/metrics", async (_req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics())
});

app.use(morgan(config.env === "development" ? "dev" : "combined"));
app.use("/api", ApiRouter);

// catch all unmatched urls
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Error-Handler must be last, and must have all 4 params
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (res.headersSent) return next(err);

  const status = err instanceof HttpError ? err.status : 500;
  const message = err instanceof HttpError ? err.message : "Internal server error";
  res.status(status).json({ error: message });
});

export { app };
