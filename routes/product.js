const {
  createProduct,
  getProduct,
  deleteProduct,
  findProduct,
  updateProduct,
  getProductCategory,
  getProductVendor,
  productVendor,
  productCategory,
  getProductTags,
  getProductImages,
  getProductFormula,
  getProductConversion,
  getAllProductConversion,
  findForUpdate,
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
router.get("/product/product_category/", productCategory);
router.get("/product/product_vendor/:id", getProductVendor);
router.get("/product/product_category/:id", getProductCategory);
router.get("/product/product_tags/:id", getProductTags);
router.get("/product/product_generic_formula/:id", getProductFormula);
router.get("/product/product_images/:id", getProductImages);
router.post("/product/product_conversion/", getProductConversion);
router.get("/product/product_conversion/", getAllProductConversion);
router.post("/product/find_for_update", findForUpdate);
//
module.exports = router;
