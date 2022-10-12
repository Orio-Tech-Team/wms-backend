const sequelize = require("./index");
const { DataTypes } = require("sequelize");
//
const PO_Detail = sequelize.define(
  "po_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    product_name: {
      type: DataTypes.STRING,
    },
    ordered_quantity: {
      type: DataTypes.INTEGER,
    },
    received_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
module.exports = PO_Detail;
