const {
  createCategory,
  getCategory,
  deleteCategory,
  findCategory,
  updateCategory,
} = require("../controller/category");
//

const express = require("express"),
  router = express.Router();

router.post("/product/category/add_category/", createCategory);
router.get("/product/category/", getCategory);
router.delete("/product/category/:id", deleteCategory);
router.get("/product/category/update/:id", findCategory);
router.put("/product/category/update/", updateCategory);

module.exports = router;
