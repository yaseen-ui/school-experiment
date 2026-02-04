import "./global.config.js";
import "module-alias/register.js";
import dotenv from "dotenv";
dotenv.config();

import logger from "./utils/logger.js";
import { sequelize } from "./utils/database.js";
import "./models/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected successfully.");

    await sequelize.sync({ alter: true });
    logger.info("Database synchronized with models.");
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error}`);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

// Start the server
startServer();
