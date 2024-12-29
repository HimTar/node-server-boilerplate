"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePortfolioQueries = void 0;
const external_1 = require("../../external");
const generatePortfolioQueries = (PortfolioModel) => {
    external_1.logger.info("Generating Queries for Portfolio Collection");
    if (!PortfolioModel)
        throw new Error("Database not connected properly");
    return Object.freeze({
        find: async (params = {}) => {
            return (await PortfolioModel?.find(params)) || [];
        },
        findById: async (id) => {
            return (await PortfolioModel?.findById(id)) || null;
        },
        insert: async (portfolio) => {
            const newPortfolio = new PortfolioModel(portfolio);
            await newPortfolio.save();
        },
        deleteById: async (id) => {
            await PortfolioModel.findByIdAndDelete(id);
        },
    });
};
exports.generatePortfolioQueries = generatePortfolioQueries;
