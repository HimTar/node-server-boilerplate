import { Request, Response, NextFunction } from "express";
import { logger } from "../external";

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `[${req.method}] ${req.originalUrl} - ${JSON.stringify(req.body)}`
  );
  next();
};
