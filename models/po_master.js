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

    expected_date: {
      type: DataTypes.DATE,
    },
    arrival_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
//
PO_Master.hasOne(PO_Detail, {
  foreignKey: "po_id",
  onDelete: "CASCADE",
});
//
//
module.exports = PO_Master;
