export const CONFIG = {
  GTAG_ID: process.env.NEXT_PUBLIC_GTAG_ID ?? "",
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN ?? "",
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
  GQL_URL: process.env.NEXT_PUBLIC_GQL_URL ?? "",
  MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL ?? "",
  ENV_MODE: process.env.ENV_MODE ?? "",
  VAPID_KEY: process.env.VAPID_PUB_KEY ?? "",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? "",
};
