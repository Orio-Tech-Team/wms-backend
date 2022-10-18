const PO_Detail = require("../models/po_details");
const PO_Master = require("../models/po_master");
const sequelize = require("../models/index");
//
const createOrder = async (req, res) => {
  // const { vendor_id, product_id, expected_date, ordered_quantity } = req.body;
  try {
    console.log(req.body);
    const dataToSend = {
      vendor_id: req.body[0].vendorId,
      vendor_name: req.body[0].vendorName,
      expected_date: req.body[0].expected_date,
    };
    const po_master_data = await PO_Master.create(dataToSend);
    //
    const dataForPO_detail = req.body.map((item) => {
      return {
        product_id: item.productId,
        product_name: item.productName,
        ordered_quantity: item.quantity,
        po_id: po_master_data.id,
      };
    });
    const po_detail_data = await PO_Detail.bulkCreate(dataForPO_detail);
    //
    return res.status(200).json("Successfully Created!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getOrder = async (req, res) => {
  try {
    const order_response = await PO_Master.findAll();
    return res.status(200).json(order_response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const order_response = await PO_Detail.findAll({
      where: { po_id: id },
    });
    return res.status(200).json(order_response);
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
const productDetailUpdate = async (req, res) => {
  console.log("hello");
};
//
module.exports = {
  createOrder,
  getOrder,
  getDetails,
  orderReceived,
  productDetailUpdate,
};
