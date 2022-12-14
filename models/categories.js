const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Product = require("./product");
const Product_Category = require("./product_category");

const Category = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category_sorting: {
      type: DataTypes.STRING,
    },
    category_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
Category.hasOne(Category, {
  foreignKey: "parent_id",
  onDelete: "CASCADE",
});
//
Category.belongsToMany(Product, {
  through: Product_Category,
  onDelete: "CASCADE",
});
Product.belongsToMany(Category, {
  through: Product_Category,
  onDelete: "CASCADE",
});
//
module.exports = Category;
