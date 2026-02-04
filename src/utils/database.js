import { Sequelize } from "sequelize";
import config from "./../../config/config.js";
import logger from "./logger.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port || 5432,
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => logger.info("Database connected successfully."))
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await sequelize.close();
  console.log("Database connection closed gracefully.");
  process.exit(0);
});

export default sequelize;
