import dotenv from "dotenv";
import { logger } from "../external";

export const Config = {
  ENV: "",
  IS_DEV_ENV: true,
  IS_PROD_ENV: false,
  DATABASE_CONNECTION_URL: "",
  PORT: 4000,
  HOST: "localhost",
};

export const loadConfigs = () => {
  logger.info("Loading Env Variables");

  // Set the NODE_ENV to 'development' by default
  process.env.NODE_ENV = process.env.NODE_ENV ?? "development";

  const envFound = dotenv.config();
  if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }

  // Setting up Config Variables
  Config.ENV = process.env.NODE_ENV;
  Config.IS_DEV_ENV = process.env.NODE_ENV === "development";
  Config.IS_PROD_ENV = process.env.NODE_ENV === "production";
  Config.DATABASE_CONNECTION_URL = process.env.POSTGRES_CONNECTION_URL ?? ""

  if (process.env.PORT) Config.PORT = parseInt(process.env.PORT);
  if (process.env.HOST) Config.HOST = process.env.HOST;

  logger.info("Env Variables loaded successfully");

  return Config;
};
