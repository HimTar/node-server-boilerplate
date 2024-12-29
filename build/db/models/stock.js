"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StockStatsSchema = new mongoose_1.default.Schema({
    open: {
        type: String,
        required: true,
    },
    close: {
        type: String,
        required: true,
    },
    high: {
        type: String,
        required: true,
    },
    low: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});
const StockSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    stats: StockStatsSchema,
}, { timestamps: true });
const Stock = mongoose_1.default.model("stock", StockSchema);
exports.default = Stock;
