const sequelize = require(".");
const { DataTypes } = require("sequelize");
const Product = require("./product");
//
const Product_GenericFormula = sequelize.define(
  "product_genericformula",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    product_generic_formula: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
Product_GenericFormula.belongsTo(Product, {
  onDelete: "CASCADE",
});
//
module.exports = Product_GenericFormula;
