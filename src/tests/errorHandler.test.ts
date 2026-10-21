import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { errorHandler } from "../middleware/errorHandler";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => { });
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("delegates to next() when headers are already sent", () => {
  const error = new Error("late");
  const res = { headersSent: true } as any
  const next = vi.fn();

  errorHandler(error, {} as any, res, next);

  expect(next).toHaveBeenCalledWith(error);
});
