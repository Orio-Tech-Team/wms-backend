const {
  createOrder,
  getOrder,
  getDetails,
} = require("../controller/po_master");
//
const express = require("express"),
  router = express.Router();
//
router.post("/product_order/add_product_order/", createOrder);
router.get("/product_order/", getOrder);
router.get("/product_order/details/:id", getDetails);
//
module.exports = router;
