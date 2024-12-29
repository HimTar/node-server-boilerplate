"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const enumerateErrorFormat = winston_1.default.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
const formatter = ({ level, message }) => {
    const now = new Date();
    return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] [${level}] ${message}`;
};
exports.logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(enumerateErrorFormat(), process.env.NODE_ENV === "development"
        ? winston_1.default.format.colorize()
        : winston_1.default.format.uncolorize(), winston_1.default.format.splat(), winston_1.default.format.printf(formatter)),
    transports: [
        new winston_1.default.transports.Console({
            stderrLevels: ["error"],
        }),
        new winston_1.default.transports.File({
            filename: "logs/info.log",
            level: "info",
        }),
        new winston_1.default.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
    ],
});
