"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const db_1 = require("../../db");
const portfolio_1 = require("../portfolio");
const helper_1 = require("./helper");
const schema_1 = require("./schema");
exports.default = async (app) => {
    app.get("/get-all", {
        handler: async (req, reply) => {
            const stocks = await db_1.dbClient.StockQueries?.find();
            reply.send({ stocks });
        },
    });
    app.get("/get", {
        schema: schema_1.StockGetByPortfolio,
        handler: async (req, reply) => {
            const portfolioId = req.query.portfolioId;
            // Check if portfolio exist
            await (0, portfolio_1.isPortfolioExist)(portfolioId);
            const stocks = await db_1.dbClient.StockQueries?.findByPortfolioId(portfolioId);
            reply.send({ stocks: stocks ?? [] });
        },
    });
    app.post("/add", {
        schema: schema_1.StockAdd,
        handler: async (req, reply) => {
            const body = req.body;
            const portfolioId = body.portfolioId;
            // Check if portfolio exist
            await (0, portfolio_1.isPortfolioExist)(portfolioId);
            // Check if date is valid
            body.history = body.history.map((history) => {
                try {
                    return {
                        price: history.price,
                        date: new Date(history.date),
                        quantity: history.quantity,
                        action: history.action,
                    };
                }
                catch (err) {
                    throw new http_errors_1.BadRequest("Invalid Purchase history date");
                }
            });
            await db_1.dbClient.StockQueries?.insert(body);
            reply.send({ success: true });
        },
    });
    app.post("/update", {
        schema: schema_1.StockUpdate,
        handler: async (req, reply) => {
            const body = req.body;
            const stockId = body._id;
            // Check if stock exist
            await (0, helper_1.isStockExist)(stockId);
            // Check if date is valid
            body.history = body.history.map((history) => {
                try {
                    return {
                        price: history.price,
                        date: new Date(history.date),
                        quantity: history.quantity,
                        action: history.action,
                    };
                }
                catch (err) {
                    throw new http_errors_1.BadRequest("Invalid Purchase history date");
                }
            });
            await db_1.dbClient.StockQueries?.update(body);
            reply.send({ success: true });
        },
    });
    app.delete("/delete", {
        schema: schema_1.StockDelete,
        handler: async (req, reply) => {
            const id = req.query.id;
            // Check if stock exists
            await (0, helper_1.isStockExist)(id);
            await db_1.dbClient.StockQueries?.deleteById(id);
            reply.send({ success: true });
        },
    });
};
