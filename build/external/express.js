"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExpressApplication = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const GenerateExpressApplication = () => {
    const expressApp = (0, express_1.default)();
    expressApp.use((0, helmet_1.default)());
    expressApp.use((0, cors_1.default)());
    // Graceful Close
    process.on("SIGTERM", process.exit(0));
    process.on("SIGINT", process.exit(0));
    return expressApp;
};
exports.GenerateExpressApplication = GenerateExpressApplication;
