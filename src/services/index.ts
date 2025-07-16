import { Express } from "express";
import { logger } from "../external";
import setupAuthRoutes from "./auth/auth.routes";

export const registerRoutes = (app: Express) => {
  // Registring auth routes
  logger.info("Registering auth routes...");
  setupAuthRoutes(app);

  logger.info("Routes successfully registerd !");
};
