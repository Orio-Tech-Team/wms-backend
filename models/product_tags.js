const sequelize = require(".");
const { DataTypes } = require("sequelize");
const Product = require("./product");
//
const Product_Tag = sequelize.define(
  "product_tags",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
Product_Tag.belongsTo(Product, {
  onDelete: "CASCADE",
});
//
module.exports = Product_Tag;
