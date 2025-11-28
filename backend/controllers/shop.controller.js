const ShopModel = require("../models/shop.model");
const uploadOnCludinary = require("../utils/cloudinary");

const createAndEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCludinary(req.file.path);
    }
    let shop = await ShopModel.findOne({ owner: req.userId });
    if (!shop) {
      shop = await ShopModel.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop = await ShopModel.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.userId,
        },
        { new: true }
      );
    }
    await ShopModel.populate("owner");
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({
      message: `Create and edit shop error ${error}`,
    });
  }
};

const editShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, city, state, address } = req.body;
    let shop = await ShopModel.findById(shopId);
    let image;
    if (req.file) {
      image = await uploadOnCludinary(req.file.path);
    }
    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }
    shop = await ShopModel.findByIdAndUpdate(
      shopId,
      {
        name,
        city,
        state,
        address,
        image,
      },
      { new: true }
    );
    await ShopModel.populate("owner");
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(404).json({
      message: `Edit shop error ${error}`,
    });
  }
};

module.exports = { createAndEditShop, editShop };
