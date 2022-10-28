const asyncHandler = require("express-async-handler");
const Location = require("../models/location.model");
//
const createLocation = asyncHandler(async (req, res) => {
  const {
    loc_code,
    loc_name,
    loc_address,
    loc_country,
    loc_city,
    loc_contact_person,
    loc_contact_cellno,
    loc_tel,
    loc_fax,
    loc_email,
    loc_status,
    account_number,
    loc_type,
    cur_type,
  } = req.body;
  try {
    const response = await Location.create({
      loc_code,
      loc_name,
      loc_address,
      loc_country,
      loc_city,
      loc_contact_person,
      loc_contact_cellno,
      loc_tel,
      loc_fax,
      loc_email,
      loc_status,
      account_number,
      loc_type,
      cur_type,
    });
    return res.status(201).json("Menu Created Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//
const getLocation = asyncHandler(async (req, res) => {
  try {
    const response = await Location.findAll();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//
module.exports = { getLocation, createLocation };
