const selectAllFromArray = require("../functions/array_modifier");
const sequelize = require("../models");
const Vendor = require("../models/vendors");
const Vendor_Manufacturer = require("../models/vendor_manufacturer");
const Vendor_Tax = require("../models/vendor_tax");
//
const createVendor = async (req, res) => {
  const {
    vendor_status,
    vendor_name,
    procurement_category,
    vendor_classification,
    ntn,
    cnic,
    cnic_expiry_date,
    line_of_business,
    tax_exemption_validity,
    //
    with_hold_tax_group,
    with_hold_tax_percentage,
    sales_tax_group,
    sales_tax_percentage,
    //
    strn,
    drug_license_no,
    tax_status,
    drug_sales_license,
    tax_exemption,
    contact_person,
    poc_phone_number,
    poc_email,
    business_address,
    city,
    business_phone_number,
    email_address,
    payment_terms,
    payment_method,
    vendor_credit_limit,
    delivery_lead_time,
    bank_name,
    bank_branch_code,
    branch_city,
    account_ibn_number,
    vendor_wise_discount,
    stock_return_policy,
    advance_income_tax,
    gst,
    minimum_order_quantity,
    manufacturer,
  } = req.body;
  try {
    const vendor_data = await Vendor.create({
      vendor_status,
      vendor_name,
      procurement_category,
      vendor_classification,
      ntn,
      cnic,
      cnic_expiry_date,
      line_of_business,
      tax_exemption_validity,
      //
      with_hold_tax_group,
      with_hold_tax_percentage,
      sales_tax_group,
      sales_tax_percentage,
      //
      strn,
      drug_license_no,
      tax_status,
      drug_sales_license,
      tax_exemption,
      contact_person,
      poc_phone_number,
      poc_email,
      business_address,
      city,
      business_phone_number,
      email_address,
      payment_terms,
      payment_method,
      vendor_credit_limit,
      delivery_lead_time,
      bank_name,
      bank_branch_code,
      branch_city,
      account_ibn_number,
      vendor_wise_discount,
      stock_return_policy,
      advance_income_tax,
      gst,
      minimum_order_quantity,
    });
    //
    const junctionValues = manufacturer.map((manufacturer_id) => {
      return {
        vendorId: vendor_data.id,
        manufacturerId: manufacturer_id,
      };
    });
    //
    const vendor_manufacturer_data = await Vendor_Manufacturer.bulkCreate(
      junctionValues
    );
    //
    return res.status(200).json({
      data: [vendor_data.id],
      message: "Created Successfully!",
    });
    //
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getVendor = async (req, res) => {
  try {
    const vendor_data = await Vendor.findAll();
    return res.status(200).json(vendor_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendor = await Vendor.destroy({
      where: {
        id,
      },
    });
    const vendor_manufacturer = await Vendor_Manufacturer.destroy({
      where: {
        vendorId: id,
      },
    });
    return res.status(200).json("Deleted Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const findVendor = async (req, res) => {
  var manufacturer_id_temp = [];
  var data_to_return;
  try {
    const id = req.params.id;
    const [vendor] = await Vendor.findAll({
      where: {
        id,
      },
    });
    const manufacturer_vendor = await Vendor_Manufacturer.findAll({
      where: {
        vendorId: id,
      },
    });
    manufacturer_vendor.forEach((each_item) => {
      manufacturer_id_temp.push(each_item.manufacturerId);
    });
    //
    const query = selectAllFromArray(manufacturer_id_temp);
    const [manufacturer_response] = await sequelize.query(
      `SELECT id,manufacturer_name,line_of_business,manufacturer_status FROM manufacturers WHERE (id) IN ${query}`
    );
    return res.json({
      ...vendor.dataValues,
      manufacturer: manufacturer_response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const updateVendor = async (req, res) => {
  const {
    id,
    vendor_status,
    vendor_name,
    procurement_category,
    vendor_classification,
    ntn,
    cnic,
    cnic_expiry_date,
    line_of_business,
    tax_exemption_validity,
    with_hold_tax_group,
    with_hold_tax_percentage,
    sales_tax_group,
    sales_tax_percentage,
    strn,
    drug_license_no,
    tax_status,
    drug_sales_license,
    tax_exemption,
    contact_person,
    poc_phone_number,
    poc_email,
    business_address,
    city,
    business_phone_number,
    email_address,
    payment_terms,
    payment_method,
    vendor_credit_limit,
    delivery_lead_time,
    bank_name,
    bank_branch_code,
    branch_city,
    account_ibn_number,
    vendor_wise_discount,
    stock_return_policy,
    advance_income_tax,
    gst,
    minimum_order_quantity,
    manufacturer,
  } = req.body;
  try {
    const vendor = await Vendor.update(
      {
        vendor_status,
        vendor_name,
        procurement_category,
        vendor_classification,
        ntn,
        cnic,
        cnic_expiry_date,
        line_of_business,
        tax_exemption_validity,
        with_hold_tax_group,
        with_hold_tax_percentage,
        sales_tax_group,
        sales_tax_percentage,
        strn,
        drug_license_no,
        tax_status,
        drug_sales_license,
        tax_exemption,
        contact_person,
        poc_phone_number,
        poc_email,
        business_address,
        city,
        business_phone_number,
        email_address,
        payment_terms,
        payment_method,
        vendor_credit_limit,
        delivery_lead_time,
        bank_name,
        bank_branch_code,
        branch_city,
        account_ibn_number,
        vendor_wise_discount,
        stock_return_policy,
        advance_income_tax,
        gst,
        minimum_order_quantity,
      },
      { where: { id } }
    );
    //
    const clear_vendor_manufacturer = await Vendor_Manufacturer.destroy({
      where: {
        vendorId: id,
      },
    });
    //
    const junctionTableValues = manufacturer.map((manufacturerId) => {
      return {
        vendorId: id,
        manufacturerId: manufacturerId,
      };
    });
    //
    //
    const vendor_manufacturer = await Vendor_Manufacturer.bulkCreate(
      junctionTableValues
    );
    //
    return res.json({
      data: [id],
      message: "Updated Successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const vendorManufacturer = async (req, res) => {
  try {
    const id = req.params.id;
    const manufacturer = await Vendor_Manufacturer.findAll({
      where: {
        vendorId: id,
      },
    });

    return res.json(manufacturer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const vendorTax = async (req, res) => {
  try {
    const returnValue = await Vendor_Tax.findAll();
    return res.json(returnValue);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const vendorProducts = async (req, res) => {
  try {
    const returnValue = await sequelize.query(
      "Select pv.*,p.product_name,p.quantity,v.vendor_name from product_vendors pv LEFT JOIN products p ON p.id = pv.productId LEFT JOIN vendors v ON v.id = pv.vendorId"
    );
    return res.json(returnValue);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
module.exports = {
  createVendor,
  getVendor,
  deleteVendor,
  findVendor,
  updateVendor,
  vendorManufacturer,
  vendorTax,
  vendorProducts,
};
