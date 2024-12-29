"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioDelete = exports.PortfolioAdd = exports.PortfolioGet = void 0;
exports.PortfolioGet = {
    querystring: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string" },
        },
    },
};
exports.PortfolioAdd = {
    body: {
        type: "object",
        required: ["title", "description"],
        properties: {
            title: { type: "string" },
            description: { type: "string" },
        },
    },
};
exports.PortfolioDelete = {
    querystring: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string" },
        },
    },
};
