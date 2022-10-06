const sequelize = require(".");
const { DataTypes } = require("sequelize");
//
const Product_Vendor = sequelize.define(
  "product_vendor",
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
module.exports = Product_Vendor;
