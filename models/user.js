const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Customer = require("./customer.model");
const UserType = require("./user_type.model");
//
const User = sequelize.define("users", {
  //
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  //
  user_id: {
    type: DataTypes.STRING,
    unique: true,
  },
  //
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  //
  password: {
    type: DataTypes.STRING,
  },
  //
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Customer,
      key: "account_number",
    },
  },
  //
  user_name: {
    type: DataTypes.STRING,
  },
  //
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
  },
  //
  user_status: {
    type: DataTypes.ENUM("A", "I"),
    defaultValue: "A",
  },
  //
  loc_code: {
    type: DataTypes.STRING,
  },
  //
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: UserType,
      key: "type",
    },
  },
});
//
module.exports = User;
