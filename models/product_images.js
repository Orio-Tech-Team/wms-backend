const sequelize = require(".");
const { DataTypes } = require("sequelize");
const Product = require("./product");
//
const Product_Image = sequelize.define(
  "product_image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
Product_Image.belongsTo(Product, {
  onDelete: "CASCADE",
});
//
module.exports = Product_Image;
