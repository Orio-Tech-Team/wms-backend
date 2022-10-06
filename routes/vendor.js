const {
  getVendor,
  createVendor,
  // deleteVendor,
  // findVendor,
  // updateVendor,
  // vendorManufacturer,
  // vendorTax,
} = require("../controller/vendor");
//
const express = require("express"),
  router = express.Router();
//
router.post("/vendor/add_vendor", createVendor);
router.get("/vendor/", getVendor);
// router.delete("/vendor/:id", deleteVendor);
// router.get("/vendor/update/:id", findVendor);
// router.put("/vendor/update/", updateVendor);
// router.get("/vendor/vendor_manufacturer/:id", vendorManufacturer);
// router.get("/vendor/add_vendor/vendor_tax/", vendorTax);
//
module.exports = router;
