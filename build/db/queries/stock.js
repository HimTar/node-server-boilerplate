"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStockQueries = void 0;
const external_1 = require("../../external");
const generateStockQueries = (StockModel) => {
    external_1.logger.info("Generating Queries for Stock Collection");
    if (!StockModel)
        throw new Error("Database not connected properly");
    return Object.freeze({
        find: async (params = {}) => {
            return (await StockModel?.find(params)) || [];
        },
        findById: async (id) => {
            return (await StockModel?.findById(id)) || null;
        },
        insert: async (stock) => {
            const newStock = new StockModel(stock);
            await newStock.save();
        },
        insertMany: async (stocks) => {
            await StockModel.insertMany(stocks);
        },
        update: async (stock) => {
            await StockModel.updateOne({ _id: stock._id }, { $set: stock });
        },
        updateMany: async (stocks) => {
            const bulkOps = stocks.map((stock) => {
                return {
                    updateOne: {
                        filter: {
                            _id: stock._id,
                        },
                        update: {
                            stats: stock.stats,
                        },
                    },
                };
            });
            await StockModel.bulkWrite(bulkOps);
        },
    });
};
exports.generateStockQueries = generateStockQueries;
