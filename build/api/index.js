"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const external_1 = require("../external");
const portfolio_1 = require("./portfolio");
const stock_1 = require("./stock");
const registerRoutes = (app) => {
    // Registring Portfolio Routes
    external_1.logger.info("Registering Portfolio Routes");
    app.register(portfolio_1.PortfolioRoutes, { prefix: "/portfolio" });
    external_1.logger.info("Registering Stock Routes");
    app.register(stock_1.StockRoutes, { prefix: "/stock" });
    external_1.logger.info("Routes successfully registerd !");
};
exports.registerRoutes = registerRoutes;
