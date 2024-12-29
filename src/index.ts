import { makeDatabaseConnection } from "./db";

import { registerRoutes } from "./api";

import { GenerateExpressApplication, logger } from "./external";
import { Config, loadConfigs } from "./config";

const StartServer = async () => {
  // Loading Config Variables
  loadConfigs();

  // Connecting to database
  await makeDatabaseConnection();

  // Building Minimal Fastify Server
  const app = GenerateExpressApplication();

  // Registring Routes
  registerRoutes(app);

  const PORT = Config.port;

  // Starting and Listening
  app.listen(PORT, () => {
    logger.info(`Server Listening on PORT : ${PORT}`);
  });
};

StartServer();
