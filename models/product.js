const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Manufacturer = require("./manufacturer");
//
const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    item_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    product_name: {
      type: DataTypes.STRING,
    },
    sku_description: {
      type: DataTypes.STRING,
    },
    sku_department: {
      type: DataTypes.STRING,
    },
    item_nature: {
      type: DataTypes.STRING,
    },
    tax_code: {
      type: DataTypes.STRING,
    },
    purchasing_unit: {
      type: DataTypes.STRING,
    },
    trade_price: {
      type: DataTypes.STRING,
    },
    discounted_price: {
      type: DataTypes.STRING,
    },
    maximum_retail_price: {
      type: DataTypes.STRING,
    },
    margin: {
      type: DataTypes.INTEGER,
    },
    sku_minimum_level: {
      type: DataTypes.STRING,
    },
    sku_maximum_level: {
      type: DataTypes.STRING,
    },
    sku_reorder_level: {
      type: DataTypes.STRING,
    },
    sku_warehouse_lead_time: {
      type: DataTypes.DATE,
    },
    item_release_level: {
      type: DataTypes.STRING,
    },
    price_levels: {
      type: DataTypes.STRING,
    },
    stock_nature: {
      type: DataTypes.STRING,
    },
    bar_code: {
      type: DataTypes.STRING,
    },
    item_storage_location: {
      type: DataTypes.STRING,
    },
    selling_discount: {
      type: DataTypes.STRING,
    },
    item_tracking_level: {
      type: DataTypes.STRING,
    },
    product_lifecycle: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
    },
    prescription_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    drap_id: {
      type: DataTypes.STRING,
    },
    side_effects: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//

//
module.exports = Product;
