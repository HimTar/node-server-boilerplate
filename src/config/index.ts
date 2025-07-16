import dotenv from "dotenv";
import { logger } from "../external";

export const Config = {
  ENV: "",
  IS_DEV_ENV: true,
  IS_PROD_ENV: false,
  JWT_SECRET: "",
  JWT_EXPIRATION_TIME: 24 * 36000,
  DATABASE_CONNECTION_URL: "",
  PORT: 4000,
  HOST: "localhost",
};

export const loadConfigs = () => {
  logger.info("Loading Env Variables");

  const envFound = dotenv.config();
  if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }

  // Setting up Config Variables using getEnvVar
  Config.ENV = getEnvVar("NODE_ENV");
  Config.IS_DEV_ENV = Config.ENV === "development";
  Config.IS_PROD_ENV = Config.ENV === "production";
  Config.DATABASE_CONNECTION_URL = getEnvVar("POSTGRES_CONNECTION_URL", true);
  Config.JWT_SECRET = getEnvVar("JWT_SECRET", true);
  Config.JWT_EXPIRATION_TIME =
    getEnvVarInt("JWT_EXPIRATION_TIME") || Config.JWT_EXPIRATION_TIME;

  if (process.env.PORT) Config.PORT = parseInt(process.env.PORT);
  if (process.env.HOST) Config.HOST = process.env.HOST;

  logger.info("Env Variables loaded successfully");

  return Config;
};

function getEnvVar(key: string, mandatory = false): string {
  const value = process.env[key];
  if (mandatory && (!value || value.trim() === "")) {
    throw new Error(`Missing mandatory environment variable: ${key}`);
  }
  return value ?? "";
}

function getEnvVarInt(key: string, mandatory = false): number {
  const value = process.env[key];
  if (mandatory && (!value || value.trim() === "")) {
    throw new Error(`Missing mandatory environment variable: ${key}`);
  }
  const intValue = value ? parseInt(value, 10) : NaN;
  if (mandatory && isNaN(intValue)) {
    throw new Error(`Environment variable ${key} must be an integer`);
  }
  return isNaN(intValue) ? 0 : intValue;
}
