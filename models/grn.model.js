const sequelize = require("./index");
const { DataTypes } = require("sequelize");

const GRN = sequelize.define(
  "grn",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    po_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    required_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    received_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maximum_retail_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    trade_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    discounted_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    batch_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batch_expiry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remaining_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_updatable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    grn_status: {
      type: DataTypes.ENUM("R", "PR"),
      defaultValue: "R",
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
module.exports = GRN;
