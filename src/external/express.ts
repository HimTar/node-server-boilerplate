import cors from "cors";
import express, { Request, Response, NextFunction, Express } from "express";
import helmet from "helmet";

export const GenerateExpressApplication = (): Express => {
  const expressApp = express();

  expressApp.use(helmet());
  expressApp.use(cors());
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  // Graceful shutdown
  const shutdown = () => {
    // Perform any cleanup here if needed
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  // Default Error Handler
  expressApp.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return expressApp;
};
