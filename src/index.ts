import { makeDatabaseConnection } from "./db";

import { registerRoutes } from "./services";

import { GenerateExpressApplication, logger } from "./external";
import { Config, loadConfigs } from "./config";
import { defaultErrorHandler } from "./middlewares/errorHandler";

const StartServer = async () => {
  // Loading Config Variables
  loadConfigs();

  // Connecting to database
  await makeDatabaseConnection();

  // Building Minimal Fastify Server
  const app = GenerateExpressApplication();

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy" });
  });

  // Registring Routes
  registerRoutes(app);

  // default error handler
  app.use(defaultErrorHandler);
  app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Not Found" });
  });

  const port = Config.PORT;

  // Starting and Listening
  app.listen(port, () => {
    logger.info(`Server Listening on PORT : ${port}`);
  });
};

StartServer();
