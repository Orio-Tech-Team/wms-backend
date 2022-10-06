const {
  createManufacturer,
  getManufacturer,
  getManufacturerByID,
  deleteManufacturer,
  updateManufacturer,
} = require("../controller/manufacturer");
//
const express = require("express"),
  router = express.Router();
//
router.post("/manufacturer/add_manufacturer", createManufacturer);
router.get("/manufacturer/", getManufacturer);
router.get("/manufacturer/update/:id", getManufacturerByID);
router.delete("/manufacturer/:id", deleteManufacturer);
router.put("/manufacturer/update/", updateManufacturer);
//
module.exports = router;
