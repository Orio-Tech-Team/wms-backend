const sequelize = require(".");
const { DataTypes } = require("sequelize");
//
const Product_Category = sequelize.define(
  "product_category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
module.exports = Product_Category;
