"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const helper_1 = require("./helper");
const schema_1 = require("./schema");
exports.default = async (app) => {
    app.get("/get-all", {
        handler: async (req, reply) => {
            const portfolios = await db_1.dbClient.PortfolioQueries?.find();
            const portfolioStocks = await Promise.all(portfolios?.map(async (folio) => {
                const stocks = await db_1.dbClient.StockQueries?.findByPortfolioId(folio._id);
                return {
                    ...folio.toObject(),
                    stocks,
                };
            }) ?? []);
            reply.send({ portfolios: portfolioStocks });
        },
    });
    app.get("/get", {
        schema: schema_1.PortfolioGet,
        handler: async (req, reply) => {
            const id = req.query.id;
            const portfolio = await (0, helper_1.isPortfolioExist)(id);
            reply.send(portfolio);
        },
    });
    app.post("/add", {
        schema: schema_1.PortfolioAdd,
        handler: async (req, reply) => {
            const body = req.body;
            await db_1.dbClient.PortfolioQueries?.insert(body);
            reply.send({ success: true });
        },
    });
    app.delete("/delete", {
        schema: schema_1.PortfolioDelete,
        handler: async (req, reply) => {
            const id = req.query.id;
            await (0, helper_1.isPortfolioExist)(id);
            await db_1.dbClient.PortfolioQueries?.deleteById(id);
            reply.send({ success: true });
        },
    });
};
