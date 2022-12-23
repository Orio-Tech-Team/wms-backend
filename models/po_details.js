const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const PO_Master = require("./po_master");
//
const PO_Detail = sequelize.define(
  "po_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    //
    product_id: {
      type: DataTypes.INTEGER,
    },
    //
    product_name: {
      type: DataTypes.STRING,
    },
    //
    manufacturer: {
      type: DataTypes.STRING,
    },
    //
    required_quantity: {
      type: DataTypes.INTEGER,
    },
    //
    received_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    //
    trade_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    //
    total_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    //
    discounted_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    //
    taxed_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    //
    foc: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    //
    item_conversion: {
      type: DataTypes.STRING,
    },
    //
    trade_discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    //
    sales_tax_percentage: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    //
    uom: {
      type: DataTypes.STRING,
    },
    //
    batch_no: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    //
    batch_expiry: {
      type: DataTypes.STRING,
    },
    //
    comments: {
      type: DataTypes.STRING,
    },
    //

  },
  {
    initialAutoIncrement: 1000,
  }
);
//
PO_Master.hasOne(PO_Detail, {
  foreignKey: "po_id",
  onDelete: "CASCADE",
});

module.exports = PO_Detail;
