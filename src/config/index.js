const dotenv = require("dotenv");
const logger = require("../utils/logger");

dotenv.config({
  encoding: "utf-8",
  override: false,
});

const NODE_ENV = process.env.NODE_ENV;
const SECRET_CODE = process.env.SECRET_CODE;

exports.NODE_ENV = NODE_ENV;
exports.SECRET_CODE = SECRET_CODE;
module.exports = process.env;

if (NODE_ENV !== "production") {
  logger.info("Environment variables loaded!");
}
