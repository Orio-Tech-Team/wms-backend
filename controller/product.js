const Product = require("../models/product");
const Product_Category = require("../models/product_category");
const Product_Image = require("../models/product_images");
const Product_Tag = require("../models/product_tags");
const Product_Vendor = require("../models/product_vendor");
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
    selling_unit,
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
    item_conversion,
    selling_discount,
    item_tracking_level,
    product_lifecycle,
    manufacturer_id,
    product_generic_formula,
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
  } = req.body;
  //
  try {
    const product_data = Product.create({
      item_status,
      product_name,
      sku_description,
      sku_department,
      item_nature,
      tax_code,
      purchasing_unit,
      selling_unit,
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
      item_conversion,
      selling_discount,
      item_tracking_level,
      product_lifecycle,
      manufacturerId: manufacturer_id,
      product_generic_formula,
      quantity,
      prescription_required,
      drap_id,
      dosage_instruction,
      side_effects,
      margin,
    });
    //
    //
    const productPictureKeys = Object.keys(productPictures);
    const productPicturesRaw = productPictureKeys
      .map((eachKey) => {
        return productPictures[eachKey] != ""
          ? {
              productId: product_data.id,
              image_url: productPictures[eachKey],
            }
          : "";
      })
      .filter((eachValue) => {
        return eachValue != "";
      });
    const productPictureResponse = await Product_Image.bulkCreate(
      productPicturesRaw
    );

    const productTagsRaw = productTags
      .map((eachItem) => {
        if (productTags.length > 0) {
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

    const vendorRaw = vendor.map((vendorId) => {
      {
        return {
          vendorId: vendorId,
          productId: product_data.id,
        };
      }
    });
    const productVendorResponse = await Product_Vendor.bulkCreate(vendorRaw);

    const categoryRaw = category.map((categoryId) => {
      return {
        categoryId: categoryId,
        productId: product_data.id,
      };
    });
    const productCategoryResponse = await Product_Category.bulkCreate(
      categoryRaw
    );
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
    const product_data = await Product.findAll();
    return res.status(200).json(product_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//
const deleteProduct = async (req, res) => {
  const id = req.params.id;
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
    const product_data = await Product.findAll({
      where: {
        id,
      },
    });
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
    selling_unit,
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
    item_conversion,
    selling_discount,
    item_tracking_level,
    product_lifecycle,
    manufacturer_id,
    product_generic_formula,
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
        selling_unit,
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
        item_conversion,
        selling_discount,
        item_tracking_level,
        product_lifecycle,
        manufacturerId: manufacturer_id,
        product_generic_formula,
        quantity,
        prescription_required,
        drap_id,
        dosage_instruction,
        side_effects,
        margin,
      },
      {
        where: {
          id,
        },
      }
    );
    //
    const deleteProductImage = await Product_Image.destroy({
      where: {
        id,
      },
    });
    const deleteProductTag = await Product_Tag.destroy({
      where: {
        id,
      },
    });
    const deleteProductVendor = await Product_Vendor.destroy({
      where: {
        id,
      },
    });
    const deleteProductCategory = await Product_Category.destroy({
      where: {
        id,
      },
    });
    //
    //
    const productPictureKeys = Object.keys(productPictures);
    const productPicturesRaw = productPictureKeys
      .map((eachKey) => {
        return productPictures[eachKey] != ""
          ? {
              productId: product_data.id,
              image_url: productPictures[eachKey],
            }
          : "";
      })
      .filter((eachValue) => {
        return eachValue != "";
      });
    const productPictureResponse = await Product_Image.bulkCreate(
      productPicturesRaw
    );

    const productTagsRaw = productTags
      .map((eachItem) => {
        if (productTags.length > 0) {
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

    const vendorRaw = vendor.map((vendorId) => {
      {
        return {
          vendorId: vendorId,
          productId: product_data.id,
        };
      }
    });
    const productVendorResponse = await Product_Vendor.bulkCreate(vendorRaw);

    const categoryRaw = category.map((categoryId) => {
      return {
        categoryId: categoryId,
        productId: product_data.id,
      };
    });
    const productCategoryResponse = await Product_Category.bulkCreate(
      categoryRaw
    );
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
module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  findProduct,
  updateProduct,
  productVendor,
};
