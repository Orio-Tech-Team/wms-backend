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

    const productTagsRaw = productTags
      .map(async (eachItem) => {
        if (productTags.length > 0) {
          const tagsData = await Tag.findOrCreate({
            where: { tag: eachItem },
          });
          return {
            productId: product_data.id,
            tag_name: eachItem,
          };
        }
        return "";
      })
      .filter((eachValue) => {
        return eachValue != "";
      });
    const productTagsResponse = await Product_Tag.bulkCreate(productTagsRaw);
    //
    const productFormulaRaw = productGenericFormula
      .map((eachItem) => {
        if (productGenericFormula.length > 0) {
          return {
            productId: product_data.id,
            product_generic_formula: eachItem,
          };
        }
        return "";
      })
      .filter((eachValue) => {
        return eachValue != "";
      });
    const productFormulaResponse = await Product_GenericFormula.bulkCreate(
      productFormulaRaw
    );
    //

    const vendorKeys = Object.keys(vendor);

    if (vendorKeys.length > 0) {
      const vendorRaw = vendor.selected.map((vendorId) => {
        {
          return {
            vendorId: vendorId,
            productId: product_data.id,
          };
        }
      });
      const productVendorResponse = await Product_Vendor.bulkCreate(vendorRaw);
    }

    const categoryKeys = Object.keys(category);
    if (categoryKeys.length > 0) {
      const categoryRaw = category.selected.map((categoryId) => {
        return {
          categoryId: categoryId,
          productId: product_data.id,
        };
      });
      const productCategoryResponse = await Product_Category.bulkCreate(
        categoryRaw
      );
    }
    //
    return res.status(200).json("Created Successfully!");
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
        case 3:
          type = "T";
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
    const productTagsRaw = productTags
      .map((eachItem) => {
        if (productTags.length > 0) {
          return {
            productId: id,
            tag_name: eachItem,
          };
        }
        return "";
      })
      .filter((eachValue) => {
        return eachValue != "";
      });
    const productTagsResponse = await Product_Tag.bulkCreate(productTagsRaw);
    //
    const productGenericFormulaRaw = productGenericFormula
      .map((eachItem) => {
        if (productGenericFormula.length > 0) {
          return {
            productId: id,
            product_generic_formula: eachItem,
          };
        }
        return "";
      })
      .filter((eachValue) => {
        return eachValue != "";
      });
    const productGenericFormulaResponse =
      await Product_GenericFormula.bulkCreate(productGenericFormulaRaw);

    const vendorKeys = Object.keys(vendor);
    console.log(vendorKeys);
    if (vendorKeys.length > 0) {
      const vendorRaw = vendor.selected.map((vendorId) => {
        {
          return {
            vendorId: vendorId,
            productId: id,
          };
        }
      });
      const productVendorResponse = await Product_Vendor.bulkCreate(vendorRaw);
    }

    const categoryKeys = Object.keys(category);
    if (categoryKeys.length > 0) {
      const categoryRaw = category.selected.map((categoryId) => {
        return {
          categoryId: categoryId,
          productId: id,
        };
      });
      const productCategoryResponse = await Product_Category.bulkCreate(
        categoryRaw
      );
    }
    //
    return res.status(200).json("Updated Successfully!");
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
};
