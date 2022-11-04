const asyncHandler = require("express-async-handler");
const sequelize = require("../models");
const Menu = require("../models/menu.model");
const Rights = require("../models/rights.model");
//
const createMenu = asyncHandler(async (req, res) => {
  const { sorting, icon, name, url_path, status, masterId, strict, user_id } =
    req.body;
  try {
    const response = await Menu.create({
      icon,
      name,
      url_path,
      status,
      masterId,
      strict,
      sorting,
    });
    //
    return res.status(201).json("Menu Created Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//
const getMenu = asyncHandler(async (req, res) => {
  const user_id = req.params.id;
  try {
    const response = await sequelize.query(
      `Select m.*,r.menu_id from rights r left join menus m on m.id = r.menu_id where r.user_id='${user_id}'  order by r.menu_id asc`
    );
    if (response.length > 1) {
      return res.json(response[0]);
    }
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//
const setRights = asyncHandler(async (req, res) => {
  const { user_id, menu_id } = req.body;
  try {
    const deleted = await Rights.destroy({
      where: { user_id },
    });
    menu_id.forEach(async (item) => {
      const response = await Rights.create({
        user_id,
        menu_id: item,
      });
    });
    return res.status(201).json("Rights set successfully!");
  } catch (err) {
    return res.status(500).json(err);
  }
});
//
const getRights = asyncHandler(async (req, res) => {
  try {
    const response = await Rights.findAll();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//
//
module.exports = { createMenu, getMenu, setRights, getRights };
