const Category = require("../models/categories");
const { Op } = require("sequelize");

const createCategory = async (req, res) => {
  const {
    category_level,
    category_name,
    category_description,
    category_status,
    category_sorting,
    category_image,
    id,
  } = req.body;
  try {
    const category_value = await Category.create({
      category_level,
      category_name,
      category_description,
      category_status,
      category_sorting,
      category_image,
      parent_id: id,
    });
    return res.json(category_value);
    // return res.json({ name: "Ateeb" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const category_value = await Category.findAll();
    return res.json(category_value);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category_value = await Category.destroy({
      where: {
        [Op.or]: [{ id: id }, { parent_id: id }],
      },
    });
    return res.json(category_value);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const findCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category_value = await Category.findAll({
      where: {
        id,
      },
    });
    return res.json(category_value);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const updateCategory = async (req, res) => {
  const {
    id,
    category_name,
    category_description,
    category_status,
    category_sorting,
    category_image,
  } = req.body;
  try {
    const category_value = await Category.update(
      {
        category_name,
        category_description,
        category_status,
        category_sorting,
        category_image,
      },
      { where: { id } }
    );
    return res.json(category_value);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//

module.exports = {
  updateCategory,
  createCategory,
  getCategory,
  deleteCategory,
  findCategory,
};
