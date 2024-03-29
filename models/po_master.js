const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const PO_Detail = require("./po_details");

const PO_Master = sequelize.define(
  "po_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
    },
    vendor_name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    ntn: {
      type: DataTypes.STRING,
    },
    advance_income: {
      type: DataTypes.FLOAT,
    },
    strn: {
      type: DataTypes.STRING,
    },
    payment_terms: {
      type: DataTypes.STRING,
    },
    expected_date: {
      type: DataTypes.DATE,
    },
    delivery_location: {
      type: DataTypes.STRING,
    },
    po_type: {
      type: DataTypes.STRING,
    },
    arrival_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    order_status: {
      type: DataTypes.ENUM("App", "Pen", "Rec", "PRec", "Cancel"),
      defaultValue: "Pen",
    },
    order_type: {
      type: DataTypes.ENUM("Normal", "Advance"),
    },
    subtotal: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    total_discounted_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    tax: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    grand_total: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
//

//
module.exports = PO_Master;
