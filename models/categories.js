const sequelize = require("./index");
const { DataTypes } = require("sequelize");

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
module.exports = Category;
