"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStockExist = exports.StockRoutes = void 0;
var stock_route_1 = require("./stock.route");
Object.defineProperty(exports, "StockRoutes", { enumerable: true, get: function () { return __importDefault(stock_route_1).default; } });
var helper_1 = require("./helper");
Object.defineProperty(exports, "isStockExist", { enumerable: true, get: function () { return helper_1.isStockExist; } });
