const sequelize = require("./index");
const { DataTypes } = require("sequelize");
//
const Tag = sequelize.define("tags", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  tag: {
    type: DataTypes.STRING,
    unique: true,
  },
});
//
module.exports = Tag;
