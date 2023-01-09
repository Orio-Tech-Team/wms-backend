const Category = require("../models/categories");
const { Op } = require("sequelize");
const sequelize = require("../models");

const createCategory = async (req, res) => {
  const {
    category_level,
    category_name,
    category_description,
    category_status,
    category_sorting,
    category_image,
    parent_id,
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
      parent_id,
    });
    return res.status(200).json({
      message: "Success",
      data: [category_value.id],
    });
    // return res.json({ name: "Ateeb" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const [parent_category] = await sequelize.query(
      `SELECT * FROM categories WHERE parent_id IS NULL`
    );
    const [sub_category] = await sequelize.query(
      `SELECT id, category_level, category_name, category_description, category_status, category_sorting, category_image, parent_id FROM categories WHERE parent_id IS NOT NULL`
    );
    //
    var parent_temp = [];
    parent_category.map((each_parent) => {
      var child_temp = [];
      sub_category.forEach((each_sub) => {
        if (each_parent.id === each_sub.parent_id) {
          child_temp.push(each_sub);
        }
      });
      parent_temp.push({
        ...each_parent,
        child: child_temp,
      });
    });
    //
    return res.json(parent_temp);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getParentCategories = async (req, res) => {
  try {
    const category_value = await sequelize.query(
      `SELECT id, category_name FROM categories WHERE parent_id IS NULL`
    );
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
    parent_id,
  } = req.body;
  try {
    const category_value = await Category.update(
      {
        category_name,
        category_description,
        category_status,
        category_sorting,
        category_image,
        parent_id,
      },
      { where: { id } }
    );
    return res.status(200).json({
      message: "Success",
      data: [id],
    });
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
