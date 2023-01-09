const Manufacturer = require("../models/manufacturer");
const asyncHandler = require("express-async-handler");
//
const createManufacturer = async (req, res) => {
  const { manufacturer_name, line_of_business, manufacturer_status } = req.body;
  try {
    const manufacturer = await Manufacturer.create({
      manufacturer_name,
      line_of_business,
      manufacturer_status,
    });
    return res.json({
      data: [manufacturer.id],
      message: "Created Successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getManufacturer = asyncHandler(async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findAll();
    return res.json(manufacturer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//
const getManufacturerByID = async (req, res) => {
  try {
    const id = req.params.id;
    const manufacturer = await Manufacturer.findAll({
      where: {
        id,
      },
    });
    return res.json(manufacturer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const deleteManufacturer = async (req, res) => {
  try {
    const id = req.params.id;
    const manufacturer = await Manufacturer.destroy({
      where: {
        id,
      },
    });
    return res.json(manufacturer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const updateManufacturer = async (req, res) => {
  const { manufacturer_name, line_of_business, manufacturer_status, id } =
    req.body;
  try {
    const manufacturer = await Manufacturer.update(
      {
        manufacturer_name,
        line_of_business,
        manufacturer_status,
      },
      {
        where: { id },
      }
    );
    return res.json({
      data: [manufacturer.id],
      message: "Created Successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
module.exports = {
  createManufacturer,
  getManufacturer,
  getManufacturerByID,
  deleteManufacturer,
  updateManufacturer,
};
