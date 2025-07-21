import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

import { logger } from "../lib";

export const defaultErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isHttpError(err)) {
    // Handle 500 Error
    if (err.status >= 500) {
      logger.error(`Unexpected Error : ${err}`);

      res.status(err.status).send({
        message: "Unexpected error! We are looking into it.",
        error: "UnexpectedError",
        statusCode: err.status,
      });
    } else if (err.status >= 400) {
      // Handle Rest Error
      logger.error(`Bad Request : ${err}`);

      res.status(err.status).send({
        message: err.message,
        error: "BadRequest",
        statusCode: err.status,
      });
    } else {
      // Handle Rest Error
      logger.error(`HTTP Error : ${err}`);

      res.status(err.status).send({
        message: "Unexpected error! We are looking into it.",
        error: "UnexpectedError",
        statusCode: err.status,
      });
    }
  } else if (err) {
    logger.error(`UnexpectedError : ${err}`);
    res.status(500).send("Unexpected error! We are looking into it.");
  }
};
