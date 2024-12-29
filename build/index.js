"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const api_1 = require("./api");
const external_1 = require("./external");
const config_1 = require("./config");
const StartServer = async () => {
    // Loading Config Variables
    (0, config_1.loadConfigs)();
    // Connecting to database
    await (0, db_1.makeDatabaseConnection)();
    // Building Minimal Fastify Server
    const app = (0, external_1.GenerateExpressApplication)();
    // Registring Routes
    (0, api_1.registerRoutes)(app);
    const PORT = config_1.Config.port;
    // Starting and Listening
    app.listen(PORT, () => {
        external_1.logger.info(`Server Listening on PORT : ${PORT}`);
    });
};
StartServer();
