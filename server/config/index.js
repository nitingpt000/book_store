import dotenv from "dotenv";
dotenv.config();
const {
  NODE_ENV = "development",
  APP_PORT = 3000,
  DEBUG_MODE = false,
} = process.env;

export { NODE_ENV, APP_PORT, DEBUG_MODE };
