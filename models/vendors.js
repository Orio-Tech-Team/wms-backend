const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Product = require("./product");
const Product_Vendor = require("./product_vendor");
//
const Vendor = sequelize.define(
  "vendors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    vendor_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    vendor_name: {
      type: DataTypes.STRING,
    },
    procurement_category: {
      type: DataTypes.STRING,
    },
    vendor_classification: {
      type: DataTypes.STRING,
    },
    ntn: {
      type: DataTypes.STRING,
    },
    cnic: {
      type: DataTypes.STRING,
    },
    cnic_expiry_date: {
      type: DataTypes.DATE,
    },
    strn: {
      type: DataTypes.STRING,
    },
    drug_license_no: {
      type: DataTypes.STRING,
    },
    tax_status: {
      type: DataTypes.STRING,
    },
    drug_sales_license: {
      type: DataTypes.STRING,
    },
    tax_exemption: {
      type: DataTypes.STRING,
    },
    contact_person: {
      type: DataTypes.STRING,
    },
    poc_phone_number: {
      type: DataTypes.STRING,
    },
    poc_email: {
      type: DataTypes.STRING,
    },
    business_address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    business_phone_number: {
      type: DataTypes.STRING,
    },
    email_address: {
      type: DataTypes.STRING,
    },
    payment_terms: {
      type: DataTypes.STRING,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    vendor_credit_limit: {
      type: DataTypes.STRING,
    },
    delivery_lead_time: {
      type: DataTypes.STRING,
    },
    bank_name: {
      type: DataTypes.STRING,
    },
    bank_branch_code: {
      type: DataTypes.STRING,
    },
    branch_city: {
      type: DataTypes.STRING,
    },
    account_ibn_number: {
      type: DataTypes.STRING,
    },
    vendor_wise_discount: {
      type: DataTypes.STRING,
    },
    stock_return_policy: {
      type: DataTypes.STRING,
    },
    advance_income_tax: {
      type: DataTypes.STRING,
    },
    gst: {
      type: DataTypes.STRING,
    },
    minimum_order_quantity: {
      type: DataTypes.STRING,
    },
    with_hold_tax_group: {
      type: DataTypes.STRING,
    },
    sales_tax_group: {
      type: DataTypes.STRING,
    },
    with_hold_tax_percentage: {
      type: DataTypes.STRING,
    },
    sales_tax_group: {
      type: DataTypes.STRING,
    },
    sales_tax_percentage: {
      type: DataTypes.STRING,
    },
    line_of_business: {
      type: DataTypes.STRING,
    },
    tax_exemption_validity: {
      type: DataTypes.STRING,
    },
  },
  {
    initialAutoIncrement: 1000,
  }
);
//
Vendor.belongsToMany(Product, {
  through: Product_Vendor,
  onDelete: "CASCADE",
});
Product.belongsToMany(Vendor, {
  through: Product_Vendor,
  onDelete: "CASCADE",
});
//
module.exports = Vendor;
