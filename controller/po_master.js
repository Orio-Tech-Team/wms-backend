const PO_Detail = require("../models/po_details");
const PO_Master = require("../models/po_master");
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
module.exports = { createOrder, getOrder };