const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Customer = require("./customer.model");
//
const Location = sequelize.define("location", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  loc_code: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  loc_name: {
    type: DataTypes.STRING,
  },
  loc_address: {
    type: DataTypes.STRING,
  },
  loc_country: {
    type: DataTypes.STRING,
  },
  loc_city: {
    type: DataTypes.STRING,
  },
  loc_contact_person: {
    type: DataTypes.STRING,
  },
  loc_contact_cellno: {
    type: DataTypes.STRING,
  },
  loc_tel: {
    type: DataTypes.STRING,
  },
  loc_fax: {
    type: DataTypes.STRING,
  },
  loc_email: {
    type: DataTypes.STRING,
  },
  loc_status: {
    type: DataTypes.ENUM("active", "in-active"),
    defaultValue: "active",
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Customer,
      key: "account_number",
    },
  },
  loc_type: {
    type: DataTypes.ENUM("M", "O"),
    defaultValue: "O",
  },
  cur_type: {
    type: DataTypes.STRING,
  },
});
//
module.exports = Location;
