const required = (value: string | undefined, fallback: string) => value ?? fallback;

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  appUrl: required(process.env.APP_URL, "http://localhost:3000"),
  apiUrl: required(process.env.API_URL, "http://localhost:4000"),
  jwtAccessSecret: required(process.env.JWT_ACCESS_SECRET, "dev-access-secret"),
  jwtRefreshSecret: required(process.env.JWT_REFRESH_SECRET, "dev-refresh-secret")
};
