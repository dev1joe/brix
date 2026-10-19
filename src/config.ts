export const config = {
  appName: process.env.APP_NAME ?? "Clickbox",
  env: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
}
