const { createProductOrder } = require("../controller/productOrder");
const express = require("express"),
  router = express.Router();
//
router.post("/product_order/add_product_order/", createProductOrder);
//
module.exports = router;
