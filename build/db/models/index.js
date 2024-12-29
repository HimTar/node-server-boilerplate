"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = exports.PortfolioModel = void 0;
var portfolio_1 = require("./portfolio");
Object.defineProperty(exports, "PortfolioModel", { enumerable: true, get: function () { return __importDefault(portfolio_1).default; } });
var stock_1 = require("./stock");
Object.defineProperty(exports, "StockModel", { enumerable: true, get: function () { return __importDefault(stock_1).default; } });
