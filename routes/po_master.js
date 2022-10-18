const {
  createOrder,
  getOrder,
  getDetails,
  orderReceived,
  productDetailUpdate,
} = require("../controller/po_master");
//
const express = require("express"),
  router = express.Router();
//
router.post("/product_order/add_product_order/", createOrder);
router.get("/product_order/", getOrder);
router.get("/product_order/details/:id", getDetails);
router.put("/purchase_order/order_received/:id", orderReceived);
router.put("/purchase_order/product_details/check/:id", productDetailUpdate);
//
module.exports = router;
