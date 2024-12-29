"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockDelete = exports.StockUpdate = exports.StockAdd = exports.StockGetByPortfolio = void 0;
exports.StockGetByPortfolio = {
    querystring: {
        type: "object",
        required: ["portfolioId"],
        properties: {
            portfolioId: { type: "string" },
        },
    },
};
exports.StockAdd = {
    body: {
        type: "object",
        required: ["portfolioId", "title", "currentPrice", "history"],
        properties: {
            portfolioId: { type: "string" },
            title: { type: "string" },
            code: { type: "string" },
            currentPrice: { type: "number" },
            history: {
                type: "array",
                items: {
                    type: "object",
                    required: ["price", "quantity", "date", "action"],
                    properties: {
                        price: { type: "number" },
                        quantity: { type: "number" },
                        date: { type: "string" },
                        action: { enum: ["BUY", "SELL"] },
                    },
                },
            },
        },
    },
};
exports.StockUpdate = {
    body: {
        type: "object",
        properties: {
            _id: { type: "string" },
            title: { type: "string" },
            code: { type: "string" },
            currentPrice: { type: "number" },
            history: {
                type: "array",
                items: {
                    type: "object",
                    required: ["price", "quantity", "date", "action"],
                    properties: {
                        price: { type: "number" },
                        quantity: { type: "number" },
                        date: { type: "string" },
                        action: { enum: ["BUY", "SELL"] },
                    },
                },
            },
        },
    },
};
exports.StockDelete = {
    querystring: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string" },
        },
    },
};
