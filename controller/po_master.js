const PO_Detail = require("../models/po_details");
const PO_Master = require("../models/po_master");
const sequelize = require("../models/index");
//
const createOrder = async (req, res) => {
  try {
    const {
      vendor_id,
      vendor_name,
      address,
      city,
      ntn,
      strn,
      payment_terms,
      delivery_date,
      order_type,
      delivery_location,
      po_type,
      orders,
      subtotal,
      total_discounted_price,
      total_tax,
      grand_total,
    } = req.body;

    //
    //
    const po_master_response = await PO_Master.create({
      vendor_id,
      vendor_name,
      address,
      city,
      ntn,
      strn,
      payment_terms,
      expected_date: delivery_date,
      order_type,
      delivery_location,
      po_type,
      order_status: grand_total <= 5000 ? "Approved" : "Pending",
      subtotal,
      total_discounted_price,
      tax: total_tax,
      grand_total,
    });
    //
    const po_detail_data_for_bulk_create = orders.map((each_item) => {
      return {
        po_id: po_master_response.id,
        product_id: each_item.product_id,
        product_name: each_item.product_name,
        manufacturer: each_item.manufacturer,
        required_quantity: +each_item.required_quantity,
        trade_price: +each_item.trade_price,
        total_price: +each_item.total,
        discounted_price: +each_item.discount,
        taxed_price: +each_item.taxed_price,
        foc: each_item.foc,
        item_conversion:
          each_item.item_conversion[each_item.item_conversion.length - 1],
        trade_discount: +each_item.trade_percentage,
        sales_tax_percentage: +each_item.sales_tax_percentage,
        uom: each_item.unit_of_measurement,
      };
    });
    //
    const po_detail_response = await PO_Detail.bulkCreate(
      po_detail_data_for_bulk_create
    );
    //
    return res.status(200).json({
      po_id: po_master_response.id,
    });

    //
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getOrder = async (req, res) => {
  try {
    const order_response = await PO_Master.findAll();
    const order_detail_response = await PO_Detail.findAll();
    return res.status(200).json({
      order_response: order_response,
      order_detail_response: order_detail_response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const updateDetails = async (req, res) => {
  try {
    req.body.forEach(async (element) => {
      let order_response = await PO_Detail.update(
        {
          received_quantity: element.received_quantity,
          maximum_retail_price: element.maximum_retail_price,
          purchasing_price: element.purchasing_price,
          discounted_price: element.discounted_price,
          batch_no: element.batch_no,
          batch_expiry: element.batch_expiry,
          comments: element.comments,
        },
        {
          where: {
            id: element.id,
          },
        }
      );
    });
    return res.status(200).json("Successfully Updated!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const orderReceived = async (req, res) => {
  const id = req.params.id;

  try {
    const order_response = await PO_Master.update(
      {
        order_status: "Received",
        arrival_date: new Date(),
      },
      {
        where: { id },
      }
    );
    return res.status(200).json(order_response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const orderApproved = async (req, res) => {
  const id = req.params.id;
  try {
    const order_response = await PO_Master.update(
      {
        order_status: "Approved",
      },
      {
        where: { id },
      }
    );
    return res.status(200).json("Updated Successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const productDetailUpdate = async (req, res) => {
  console.log("hello");
};
//
module.exports = {
  createOrder,
  getOrder,
  updateDetails,
  orderReceived,
  orderApproved,
  productDetailUpdate,
};
