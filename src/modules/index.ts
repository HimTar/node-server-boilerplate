import { Express } from "express";
import { logger } from "../lib";
import authRoutes from "./auth/auth.routes";

const modules: Array<{ name: string; setup: (app: Express) => void }> = [
  { name: "auth", setup: authRoutes },
];

export const setupRoutes = (app: Express) => {
  logger.info("Registering module routes...");
  try {
    modules.forEach(({ name, setup }) => {
      logger.info(`Onboarding module: ${name}`);
      setup(app);
    });
    logger.info(
      `Routes successfully registered! Module count: ${modules.length}`
    );
  } catch (err) {
    logger.error("Error registering routes:", err);
    throw err;
  }
};
