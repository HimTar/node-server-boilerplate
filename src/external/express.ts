import cors from "cors";
import express from "express";
import helmet from "helmet";

export const GenerateExpressApplication = () => {
  const expressApp = express();

  expressApp.use(helmet());
  expressApp.use(cors());

  // Graceful Close
  process.on("SIGTERM", process.exit(0));
  process.on("SIGINT", process.exit(0));

  return expressApp;
};
