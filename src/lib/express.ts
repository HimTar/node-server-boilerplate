import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { apiLogger } from "../middlewares/apiLogger";

export const GenerateExpressApplication = (): Express => {
  const expressApp = express();

  expressApp.use(helmet());
  expressApp.use(cors());
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(apiLogger);

  // Graceful shutdown
  const shutdown = () => {
    // Perform any cleanup here if needed
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  return expressApp;
};
