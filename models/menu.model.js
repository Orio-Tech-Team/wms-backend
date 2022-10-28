const sequelize = require("./index");
const { DataTypes } = require("sequelize");
//
const Menu = sequelize.define("menu", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  icon: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_path: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("Active", "In-Active"),
    defaultValue: "Active",
  },
  strict: {
    type: DataTypes.ENUM("Active", "In-Active"),
    defaultValue: "Active",
  },
  sorting: {
    type: DataTypes.INTEGER,
  },
});
//
Menu.hasOne(Menu, {
  foreignKey: "masterId",
  onDelete: "CASCADE",
});
module.exports = Menu;
