const sequelize = require("../models/index");
const Product = require("../models/product");
const Product_Category = require("../models/product_category");
const Product_Conversion = require("../models/product_convertsion");
const Product_GenericFormula = require("../models/product_genericFormula");
const Product_Image = require("../models/product_images");
const Product_Tag = require("../models/product_tags");
const Product_Vendor = require("../models/product_vendor");
const Tag = require("../models/tags");
//
const createProduct = async (req, res) => {
  const {
    item_status,
    product_name,
    sku_description,
    sku_department,
    item_nature,
    tax_code,
    purchasing_unit,
    trade_price,
    discounted_price,
    maximum_retail_price,
    sku_minimum_level,
    sku_maximum_level,
    sku_reorder_level,
    sku_warehouse_lead_time,
    item_release_level,
    price_levels,
    stock_nature,
    bar_code,
    item_storage_location,
    selling_discount,
    item_tracking_level,
    product_lifecycle,
    manufacturer_id,
    productGenericFormula,
    quantity,
    prescription_required,
    drap_id,
    dosage_instruction,
    side_effects,
    margin,
    vendor,
    category,
    productPictures,
    productTags,
    productConversion,
    sales_tax_group,
    sales_tax_percentage,
  } = req.body;
  //
  try {
    const product_data = await Product.create({
      item_status,
      product_name,
      sku_description,
      sku_department,
      item_nature,
      tax_code,
      purchasing_unit,
      trade_price,
      discounted_price,
      maximum_retail_price,
      sku_minimum_level,
      sku_maximum_level,
      sku_reorder_level,
      sku_warehouse_lead_time,
      item_release_level,
      price_levels,
      stock_nature,
      bar_code,
      item_storage_location,
      selling_discount,
      item_tracking_level,
      product_lifecycle,
      manufacturerId: manufacturer_id,
      quantity,
      prescription_required,
      drap_id,
      dosage_instruction,
      side_effects,
      margin,
      sales_tax_group,
      sales_tax_percentage,
    });
    //
    productConversion.forEach(async (item, key) => {
      let type = "";
      switch (key) {
        case 0:
          type = "C";
          break;
        case 1:
          type = "B";
          break;
        case 2:
          type = "P";
          break;

        default:
          break;
      }
      await Product_Conversion.create({
        type: type,
        selling_unit: item.selling_unit,
        item_conversion: item.item_conversion,
        productId: product_data.id,
      });
    });
    //
    if (productPictures && productPictures.length > 0) {
      var base64Data = productPictures.map((item) =>
        item.image_url.replace(/^data:image\/png;base64,/, "")
      );
      const product_url = base64Data.map((item, key) => {
        require("fs").writeFile(
          `./assets/product_images/${product_data.id + "_" + key}.png`,
          item,
          "base64",
          function (err) {
            console.log(err);
          }
        );
        return `/product_images/${product_data.id + "_" + key}.png`;
      });
      const productPicturesRaw = product_url.map((eachUrl) => {
        return {
          productId: product_data.id,
          image_url: eachUrl,
        };
      });
      const productPictureResponse = await Product_Image.bulkCreate(
        productPicturesRaw
      );
    }
    //
    if (productTags.length > 0) {
      const product_tags_temp = [];
      productTags.forEach((each_tag) => {
        product_tags_temp.push({
          productId: product_data.id,
          tag_name: each_tag,
        });
      });
      const productTagsResponse = await Product_Tag.bulkCreate(
        product_tags_temp
      );
    }
    //
    if (productGenericFormula.length > 0) {
      var generic_formula_temp = [];
      productGenericFormula.forEach((each_formula) => {
        generic_formula_temp.push({
          productId: product_data.id,
          product_generic_formula: each_formula,
        });
      });
      const productFormulaResponse = await Product_GenericFormula.bulkCreate(
        generic_formula_temp
      );
    }
    //
    if (vendor.length > 0) {
      const vendor_temp = vendor.map((each_vendor) => {
        return {
          vendorId: each_vendor,
          productId: product_data.id,
        };
      });
      const productVendorResponse = await Product_Vendor.bulkCreate(
        vendor_temp
      );
    }

    if (category.length > 0) {
      const category_temp = category.map((each_category) => {
        return {
          categoryId: each_category,
          productId: product_data.id,
        };
      });
      const productCategoryResponse = await Product_Category.bulkCreate(
        category_temp
      );
    }
    //
    return res.status(200).json({
      data: [product_data.id],
      message: "Success",
    });
    //
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getProduct = async (req, res) => {
  try {
    const [product_data, metaData] = await sequelize.query(
      "SELECT p.*,m.manufacturer_name FROM products p LEFT JOIN manufacturers m ON p.manufacturerId = m.id"
    );
    return res.status(200).json(product_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  //
  for (let i = 0; i < 3; i++) {
    require("fs").stat(
      `./assets/product_images/${id + "_" + i}.png`,
      function (err, stats) {
        if (err) {
          return console.error(err);
        }

        require("fs").unlink(
          `./assets/product_images/${id + "_" + i}.png`,
          function (err) {
            if (err) return console.log(err);
            console.log("file deleted successfully");
          }
        );
      }
    );
  }
  //
  try {
    const product_data = await Product.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json(product_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const findProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const [product_data, metaData] = await sequelize.query(
      `SELECT p.*,m.manufacturer_name FROM products p LEFT JOIN manufacturers m ON p.manufacturerId = m.id WHERE p.id = ${id}`
    );
    return res.status(200).json(product_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const updateProduct = async (req, res) => {
  const {
    id,
    item_status,
    product_name,
    sku_description,
    sku_department,
    item_nature,
    tax_code,
    purchasing_unit,
    trade_price,
    discounted_price,
    maximum_retail_price,
    sku_minimum_level,
    sku_maximum_level,
    sku_reorder_level,
    sku_warehouse_lead_time,
    item_release_level,
    price_levels,
    stock_nature,
    bar_code,
    item_storage_location,
    selling_discount,
    item_tracking_level,
    product_lifecycle,
    manufacturer_id,
    quantity,
    prescription_required,
    productGenericFormula,
    drap_id,
    dosage_instruction,
    side_effects,
    margin,
    vendor,
    category,
    productPictures,
    productTags,
    productConversion,
    sales_tax_group,
    sales_tax_percentage,
  } = req.body;
  //
  try {
    const product_data = await Product.update(
      {
        item_status,
        product_name,
        sku_description,
        sku_department,
        item_nature,
        tax_code,
        purchasing_unit,
        trade_price,
        discounted_price,
        maximum_retail_price,
        sku_minimum_level,
        sku_maximum_level,
        sku_reorder_level,
        sku_warehouse_lead_time,
        item_release_level,
        price_levels,
        stock_nature,
        bar_code,
        item_storage_location,
        selling_discount,
        item_tracking_level,
        product_lifecycle,
        manufacturerId: manufacturer_id,
        quantity,
        prescription_required,
        drap_id,
        dosage_instruction,
        side_effects,
        margin,
        sales_tax_group,
        sales_tax_percentage,
      },
      {
        where: {
          id,
        },
      }
    );
    //
    await Product_Conversion.destroy({
      where: {
        productId: id,
      },
    });
    productConversion.forEach(async (item, key) => {
      let type = "";
      switch (key) {
        case 0:
          type = "C";
          break;
        case 1:
          type = "B";
          break;
        case 2:
          type = "P";
          break;

        default:
          break;
      }
      await Product_Conversion.create({
        type: type,
        selling_unit: item.selling_unit,
        item_conversion: item.item_conversion,
        productId: product_data.id,
      });
    });
    //

    for (let i = 0; i < 3; i++) {
      require("fs").stat(
        `./assets/product_images/${id + "_" + i}.png`,
        function (err, stats) {
          if (err) {
            return console.error(err);
          }

          require("fs").unlink(
            `./assets/product_images/${id + "_" + i}.png`,
            function (err) {
              if (err) return console.log(err);
              console.log("file deleted successfully");
            }
          );
        }
      );
    }
    const deleteProductImage = await Product_Image.destroy({
      where: {
        productId: id,
      },
    });

    const deleteProductTag = await Product_Tag.destroy({
      where: {
        productId: id,
      },
    });
    const deleteProductVendor = await Product_Vendor.destroy({
      where: {
        productId: id,
      },
    });
    const deleteProductCategory = await Product_Category.destroy({
      where: {
        productId: id,
      },
    });
    const deleteProductFormula = await Product_GenericFormula.destroy({
      where: {
        productId: id,
      },
    });
    //
    //
    if (productPictures && productPictures.length > 0) {
      var base64Data = productPictures.map((item) =>
        item.image_url.replace(/^data:image\/png;base64,/, "")
      );
      const product_url = base64Data.map((item, key) => {
        require("fs").writeFile(
          `./assets/product_images/${product_data.id + "_" + key}.png`,
          item,
          "base64",
          function (err) {
            console.log(err);
          }
        );
        return `/product_images/${product_data.id + "_" + key}.png`;
      });
      const productPicturesRaw = product_url.map((eachUrl) => {
        return {
          productId: id,
          image_url: eachUrl,
        };
      });
      const productPictureResponse = await Product_Image.bulkCreate(
        productPicturesRaw
      );
      //
    }
    //
    //
    if (productTags.length > 0) {
      const product_tags_temp = [];
      productTags.forEach((each_tag) => {
        product_tags_temp.push({
          productId: product_data.id,
          tag_name: each_tag,
        });
      });
      const productTagsResponse = await Product_Tag.bulkCreate(
        product_tags_temp
      );
    }
    //
    if (productGenericFormula.length > 0) {
      var generic_formula_temp = [];
      productGenericFormula.forEach((each_formula) => {
        generic_formula_temp.push({
          productId: product_data.id,
          product_generic_formula: each_formula,
        });
      });
      const productFormulaResponse = await Product_GenericFormula.bulkCreate(
        generic_formula_temp
      );
    }
    //
    if (vendor.length > 0) {
      const vendor_temp = vendor.map((each_vendor) => {
        return {
          vendorId: each_vendor,
          productId: product_data.id,
        };
      });
      const productVendorResponse = await Product_Vendor.bulkCreate(
        vendor_temp
      );
    }

    if (category.length > 0) {
      const category_temp = category.map((each_category) => {
        return {
          categoryId: each_category,
          productId: product_data.id,
        };
      });
      const productCategoryResponse = await Product_Category.bulkCreate(
        category_temp
      );
    }
    //
    return res.status(200).json({
      data: id,
      message: "success",
    });
    //
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const productVendor = async (req, res) => {
  try {
    const productVendor_data = await Product_Vendor.findAll();
    return res.status(200).json(productVendor_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const productCategory = async (req, res) => {
  try {
    const productCategory_data = await Product_Category.findAll();
    return res.status(200).json(productCategory_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getProductCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const [product_category, metaData] = await sequelize.query(
      `SELECT p.id as ProductId,c.categoryId FROM products p LEFT JOIN product_categories c ON p.id = c.productId WHERE p.id = ${id}`
    );
    return res.status(200).json(product_category);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getProductVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const [product_vendor, metaData] = await sequelize.query(
      `SELECT p.id as ProductId,v.vendorId FROM products p LEFT JOIN product_vendors v ON p.id = v.productId WHERE p.id = ${id}`
    );
    return res.status(200).json(product_vendor);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getProductTags = async (req, res) => {
  try {
    const id = req.params.id;
    const [product_tags, metaData] = await sequelize.query(
      `SELECT p.id as ProductId,pt.tag_name FROM products p LEFT JOIN product_tags pt ON p.id = pt.productId WHERE p.id = ${id}`
    );
    return res.status(200).json(product_tags);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getProductImages = async (req, res) => {
  try {
    const id = req.params.id;
    const [product_tags, metaData] = await sequelize.query(
      `SELECT p.id as ProductId,pi.image_url FROM products p LEFT JOIN product_images pi ON p.id = pi.productId WHERE p.id = ${id}`
    );
    return res.status(200).json(product_tags);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getProductFormula = async (req, res) => {
  try {
    const id = req.params.id;
    const [productFormula, metaData] = await sequelize.query(
      `SELECT p.id as ProductId,pf.product_generic_formula FROM products p LEFT JOIN product_genericFormulas pf ON p.id = pf.productId WHERE p.id = ${id}`
    );
    return res.status(200).json(productFormula);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getProductConversion = async (req, res) => {
  const ids = req.body.ids;
  var idString = "";
  ids.forEach((id) => {
    idString += `('${id}'),`;
  });
  idString = idString.substring(0, idString.length - 1);
  try {
    const [response, metaData] = await sequelize.query(
      `SELECT * FROM product_conversions WHERE (productId) IN (${idString})`
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const getAllProductConversion = async (req, res) => {
  try {
    const [response, metaData] = await sequelize.query(
      `SELECT products.id as product_id,
  product_conversions.selling_unit,
  product_conversions.item_conversion FROM products left join product_conversions on products.id = product_conversions.productId GROUP BY products.id order by product_conversions.id DESC ;`
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const findForUpdate = async (req, res) => {
  const { _id } = req.body;
  try {
    const [product_tag_response, metaData1] = await sequelize.query(
      `SELECT tag_name from product_tags where productId = "${_id}"`
    );
    const [product_vendor_response, metaData2] = await sequelize.query(`
    SELECT vendorId FROM product_vendors where productId = "${_id}"`);
    //
    const [product_category_response, metaData3] = await sequelize.query(`
    SELECT categoryId from product_categories where productId = "${_id}"`);
    //
    const [product_genericformula_response, metaData4] = await sequelize.query(`
    SELECT product_generic_formula FROM product_genericformulas where productId = "${_id}"`);
    //
    const [product_conversion, metaData5] = await sequelize.query(`
    SELECT selling_unit,item_conversion FROM product_conversions where productId = "${_id} order by id asc"`);
    //

    return res.status(200).json({
      product_tags: product_tag_response,
      product_vendors: product_vendor_response,
      product_categories: product_category_response,
      product_generic: product_genericformula_response,
      product_conversion: product_conversion,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  findProduct,
  updateProduct,
  productVendor,
  getProductCategory,
  getProductVendor,
  productCategory,
  getProductTags,
  getProductImages,
  getProductFormula,
  getProductConversion,
  getAllProductConversion,
  findForUpdate,
};
