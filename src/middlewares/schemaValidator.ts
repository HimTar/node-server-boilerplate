import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (
  schema: Joi.ObjectSchema,
  property: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const formattedError = error?.details[0].message.replace(/['"]/g, "");

    if (error) {
      return res
        .status(400)
        .send({ status: 400, error: "BadRequest", message: formattedError });
    }
    next();
  };
};
