import { Request, Response, NextFunction } from "express";
import { validateToken } from "../lib/jwt";
import { Config } from "../config";

export const jwtValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      status: 401,
      error: "Unauthorized",
      message: "Authorization token missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];
  const payload = validateToken(token, Config.JWT_SECRET);

  if (!payload) {
    return res.status(401).send({
      status: 401,
      error: "Unauthorized",
      message: "Invalid or expired token",
    });
  }

  // Attach payload to request for downstream use
  req.user = payload as {
    userId: string;
    email: string;
    username: string;
  };
  next();
};
