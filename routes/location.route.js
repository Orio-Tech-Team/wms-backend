const {
  getLocation,
  createLocation,
} = require("../controller/location.controller");
const express = require("express"),
  router = express.Router();
//
router.post("/create_location/", createLocation);
router.get("/get_location/:account_number", getLocation);
//
module.exports = router;
