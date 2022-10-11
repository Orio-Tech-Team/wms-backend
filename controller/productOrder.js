const ProductOrder = require("../models/productOrder");
//
const createProductOrder = async (req, res) => {
  const { productId, vendorId, quantity } = req.body;
  try {
    const productOrder_response = await ProductOrder.create({
      productId,
      vendorId,
      quantity,
    });
    return res.status(200).json(productOrder_response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
module.exports = {
  createProductOrder,
};
