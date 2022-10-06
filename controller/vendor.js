const Vendor = require("../models/vendors");
const Vendor_Manufacturer = require("../models/vendor_manufacturer");
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
    const vendor_data = Vendor.create({
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
    const junctionValues = manufacturer.selected.map((id) => {
      return {
        vendorId: vendor_data.id,
        manufacturerId: id,
      };
    });
    //
    const vendor_manufacturer_data = await Vendor_Manufacturer.bulkCreate(
      junctionValues
    );
    //
    return res.status(200).json("Created Successfully!");
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
module.exports = {
  createVendor,
  getVendor,
};
