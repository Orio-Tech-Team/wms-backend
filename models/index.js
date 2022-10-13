const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
//
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "67.222.28.145",
  }
);
module.exports = sequelize;
