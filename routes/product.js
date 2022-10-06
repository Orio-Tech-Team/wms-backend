const {
  createProduct,
  getProduct,
  deleteProduct,
  findProduct,
  updateProduct,
  productVendor,
} = require("../controller/product");
//
//
const express = require("express"),
  router = express.Router();
//
router.post("/product/add_product/", createProduct);
router.get("/product/", getProduct);
router.delete("/product/:id", deleteProduct);
router.get("/product/update/:id", findProduct);
router.put("/product/update/", updateProduct);
router.get("/product/product_vendor/", productVendor);
//
module.exports = router;
