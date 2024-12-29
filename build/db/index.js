"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMongoId = exports.makeDatabaseConnection = exports.dbClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const queries_1 = require("./queries");
const config_1 = require("../config");
const external_1 = require("../external");
exports.dbClient = {
    db: null,
    PortfolioQueries: null,
    StockQueries: null,
};
const makeDatabaseConnection = async () => {
    external_1.logger.info("Connecting to database");
    // For mongoose warning
    mongoose_1.default.set("strictQuery", true);
    const connection = await mongoose_1.default.connect(config_1.Config.databaseURL);
    exports.dbClient.db = connection;
    exports.dbClient.PortfolioQueries = (0, queries_1.generatePortfolioQueries)(models_1.PortfolioModel);
    exports.dbClient.StockQueries = (0, queries_1.generateStockQueries)(models_1.StockModel);
    external_1.logger.info("Established Connection to database");
    return exports.dbClient;
};
exports.makeDatabaseConnection = makeDatabaseConnection;
const isValidMongoId = (id) => {
    try {
        return mongoose_1.default.isValidObjectId(id);
    }
    catch (err) {
        return false;
    }
};
exports.isValidMongoId = isValidMongoId;
