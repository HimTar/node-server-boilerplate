import { makeDatabaseConnection } from "./database";

import { setupRoutes } from "./modules";

import { GenerateExpressApplication, logger } from "./lib";
import { Config, loadConfigs } from "./config";
import { defaultErrorHandler } from "./middlewares/errorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        username: string;
      };
    }
  }
}

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

  // Setting up routes and onboarding modules
  setupRoutes(app);

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
