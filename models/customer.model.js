const sequelize = require("./index");
const { DataTypes } = require("sequelize");
//
const Customer = sequelize.define("customers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
//
module.exports = Customer;
