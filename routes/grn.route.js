const {
  create,
  findAll,
  findOne,
  deleteOne,
  qualityChecker,
  qualityReject,
} = require("../controller/grn.controller");
const express = require("express"),
  router = express.Router();
//
router.get("/find_all/", findAll);
router.post("/create/", create);
router.post("/find_one/", findOne);
router.post("/delete_one/", deleteOne);
router.post("/delete_one/", deleteOne);
router.post("/quality_checker/", qualityChecker);
router.post("/quality_reject/", qualityReject);
//
module.exports = router;
