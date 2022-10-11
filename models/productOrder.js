const sequelize = require("./index");
const { DataTypes } = require("sequelize");
//
const ProductOrder = sequelize.define(
  "product_order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
module.exports = ProductOrder;
