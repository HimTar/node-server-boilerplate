import jwt from "jsonwebtoken";
import { Config } from "../config";

export const generateToken = (
  payload: Record<string, string>,
  secret: string,
  expiryTime: number
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expiryTime,
  });
};

export const validateToken = (token: string, secret: string): object | null => {
  try {
    const payload = jwt.verify(token, secret);
    return typeof payload === "string" ? null : payload;
  } catch (err) {
    return null;
  }
};
