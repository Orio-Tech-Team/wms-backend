const {
  login,
  register,
  createCustomer,
  createUserType,
  getAllUsers,
} = require("../controller/auth.controller.js");
const express = require("express"),
  router = express.Router();
//
router.post("/login/", login);
router.post("/register/", register);
router.post("/createUser/", createCustomer);
router.post("/createUserType/", createUserType);
router.get("/getUsers/", getAllUsers);
//
module.exports = router;
