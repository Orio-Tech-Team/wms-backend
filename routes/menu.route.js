const {
  createMenu,
  getMenu,
  setRights,
  getRights,
} = require("../controller/menu.controller");
const express = require("express"),
  router = express.Router();
//
router.post("/create_menu/", createMenu);
router.get("/get_menu/:id", getMenu);
router.post("/set_rights/", setRights);
router.get("/get_rights/", getRights);
//
module.exports = router;
