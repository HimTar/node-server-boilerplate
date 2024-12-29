"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPortfolioExist = void 0;
const http_errors_1 = require("http-errors");
const db_1 = require("../../db");
const isPortfolioExist = async (id) => {
    if (!(0, db_1.isValidMongoId)(id))
        throw new http_errors_1.BadRequest("Invalid portfolio Id");
    const portfolio = await db_1.dbClient.PortfolioQueries?.findById(id);
    if (!portfolio)
        throw new http_errors_1.BadRequest("Invalid portfolio Id");
    return portfolio;
};
exports.isPortfolioExist = isPortfolioExist;
