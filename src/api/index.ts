import { Express } from "express";
import { logger } from "../external";
import { PortfolioRoutes } from "./portfolio";
import { StockRoutes } from "./stock";

export const registerRoutes = (app: Express) => {
  // Registring Portfolio Routes
  logger.info("Registering Portfolio Routes");
  app.use("/portfolio", PortfolioRoutes);

  logger.info("Registering Stock Routes");
  app.use("/stock", StockRoutes);

  logger.info("Routes successfully registerd !");
};
