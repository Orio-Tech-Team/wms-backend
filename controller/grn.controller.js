const GRN = require("../models/grn.model");
//
const create = async (req, res) => {
  const { po_id, percentOrderCompleted, grnData } = req.body;
  const dataToStore = grnData.map((each_item, key) => {
    return {
      po_id: po_id,
      product_id: each_item.product_id,
      product_name: each_item.product_name,
      required_quantity: each_item.required_quantity,
      received_quantity: each_item.received_quantity,
      maximum_retail_price: each_item.maximum_retail_price,
      trade_price: each_item.trade_price,
      discounted_percentage: each_item.discounted_percentage,
      batch_no: each_item.batch_no,
      batch_expiry: each_item.batch_expiry,
      comments: each_item.comments,
      remaining_quantity:
        +each_item.required_quantity - +each_item.received_quantity,
      is_updatable:
        +each_item.required_quantity - +each_item.received_quantity === 0
          ? false
          : true,
      grn_status:
        +each_item.required_quantity - +each_item.received_quantity === 0
          ? "R"
          : "PR",
    };
  });
  try {
    const response = await GRN.bulkCreate(dataToStore);
    return res.status(200).json("Success");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const findAll = async (req, res) => {
  try {
    const response = await GRN.findAll();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const findOne = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await GRN.findOne({
      where: { id },
    });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const deleteOne = async (req, res) => {};
//
module.exports = { create, findAll, findOne, deleteOne };
