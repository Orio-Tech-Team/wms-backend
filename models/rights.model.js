const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const User = require("./user");
const Menu = require("./menu.model");
//
const Rights = sequelize.define("rights", {
  //
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  //
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  //
  menu_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Menu,
      key: "id",
    },
  },
});
//
module.exports = Rights;
