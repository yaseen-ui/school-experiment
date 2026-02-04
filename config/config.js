import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5433,
  },
  test: {
    username: process.env.TEST_DB_USER || "test_user",
    password: process.env.TEST_DB_PASSWORD || "test_password",
    database: process.env.TEST_DB_NAME || "test_db",
    host: process.env.TEST_DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.TEST_DB_PORT || 5433,
  },
  production: {
    username: process.env.PROD_DB_USER || "prod_user",
    password: process.env.PROD_DB_PASSWORD || "prod_password",
    database: process.env.PROD_DB_NAME || "prod_db",
    host: process.env.PROD_DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.PROD_DB_PORT || 5433,
  },
};

export default config;
