const sequelize = require("./index");
const { DataTypes } = require("sequelize");

const Vendor_Tax = sequelize.define(
  "vendor_tax",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    tax_group: {
      type: DataTypes.STRING,
    },
    percentage: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);

module.exports = Vendor_Tax;
