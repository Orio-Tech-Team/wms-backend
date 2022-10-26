const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const UserType = sequelize.define("user_types", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    unique: true,
    onDelete: "CASCADE",
  },
});
module.exports = UserType;
