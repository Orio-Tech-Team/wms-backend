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
  urlPath: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("A", "I"),
  },
  masterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Menu,
      key: "id",
    },
  },
});
//
module.exports = Menu;
