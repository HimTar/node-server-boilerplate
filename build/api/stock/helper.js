"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStockExist = void 0;
const http_errors_1 = require("http-errors");
const db_1 = require("../../db");
const isStockExist = async (id) => {
    if (!(0, db_1.isValidMongoId)(id))
        throw new http_errors_1.BadRequest("Invalid stock Id");
    const stock = await db_1.dbClient.StockQueries?.findById(id);
    if (!stock)
        throw new http_errors_1.BadRequest("Invalid stock Id");
    return stock;
};
exports.isStockExist = isStockExist;
