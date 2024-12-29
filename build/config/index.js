"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfigs = exports.Config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const external_1 = require("../external");
exports.Config = {
    environment: "",
    isDevEnvironment: true,
    isProdEnvironment: false,
    databaseURL: "",
    port: 4000,
    host: "0.0.0.0",
};
const loadConfigs = () => {
    external_1.logger.info("Loading Env Variables");
    // Set the NODE_ENV to 'development' by default
    process.env.NODE_ENV = process.env.NODE_ENV ?? "development";
    const envFound = dotenv_1.default.config();
    if (envFound.error) {
        // This error should crash whole process
        throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }
    // Setting up Config Variables
    exports.Config.environment = process.env.NODE_ENV;
    exports.Config.isDevEnvironment = process.env.NODE_ENV === "development";
    exports.Config.isProdEnvironment = process.env.NODE_ENV === "production";
    exports.Config.databaseURL =
        process.env.NODE_ENV === "development"
            ? process.env.DEV_MONGO_URI ?? ""
            : process.env.PROD_MONGO_URI ?? "";
    if (process.env.PORT)
        exports.Config.port = parseInt(process.env.PORT);
    external_1.logger.info("Env Variables loaded successfully");
    return exports.Config;
};
exports.loadConfigs = loadConfigs;
