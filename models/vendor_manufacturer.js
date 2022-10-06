const sequelize = require("./index");
const { DataTypes } = require("sequelize");
//
const Vendor_Manufacturer = sequelize.define(
  "vendor_manufacturer",
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
module.exports = Vendor_Manufacturer;
