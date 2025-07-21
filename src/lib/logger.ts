import winston from "winston";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

import type { TransformableInfo } from "logform";

const formatter = (info: TransformableInfo) => {
  const { level, message } = info;
  const now = new Date();

  return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] [${level}] ${String(message)}`;
};

export const logger = winston.createLogger({
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(formatter)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});
