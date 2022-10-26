const {
  login,
  register,
  createCustomer,
  createUserType,
} = require("../controller/auth.controller.js");
const express = require("express"),
  router = express.Router();
//
router.post("/login/", login);
router.post("/register/", register);
router.post("/createUser/", createCustomer);
router.post("/createUserType/", createUserType);
//
module.exports = router;
