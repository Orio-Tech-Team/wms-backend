const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Vendor = require("./vendors");
const Vendor_Manufacturer = require("./vendor_manufacturer");
const Product = require("./product");

const Manufacturer = sequelize.define(
  "manufacturers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    manufacturer_name: {
      type: DataTypes.STRING,
      allowNull: [false, "Please Enter Manufacturer"],
    },
    line_of_business: {
      type: DataTypes.STRING,
      allowNull: [false, "Please Enter Manufacturer"],
    },
    manufacturer_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
Manufacturer.hasOne(Product, {
  onDelete: "CASCADE",
});
//
Manufacturer.belongsToMany(Vendor, {
  through: Vendor_Manufacturer,
  onDelete: "CASCADE",
});
Vendor.belongsToMany(Manufacturer, {
  through: Vendor_Manufacturer,
  onDelete: "CASCADE",
});
//
module.exports = Manufacturer;
