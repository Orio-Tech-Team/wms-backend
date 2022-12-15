const {
  create,
  findAll,
  findOne,
  deleteOne,
} = require("../controller/grn.controller");
const express = require("express"),
  router = express.Router();
//
router.get("/find_all/", findAll);
router.post("/create/", create);
router.post("/find_one/", findOne);
router.post("/delete_one/", deleteOne);
//
module.exports = router;
