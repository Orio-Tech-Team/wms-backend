const sequelize = require(".");
const { DataTypes } = require("sequelize");
const Product = require("./product");
//
const Product_Conversion = sequelize.define(
  "product_conversion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    selling_unit: {
      type: DataTypes.ENUM("Carton", "Box", "Pieces", "Strips"),
    },
    item_conversion: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
Product_Conversion.belongsTo(Product, {
  onDelete: "CASCADE",
});
//
module.exports = Product_Conversion;
