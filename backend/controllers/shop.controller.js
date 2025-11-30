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
        },
        { new: true }
      );
    }
    await shop.populate("owner");
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({
      message: `Create and edit shop error ${error.message}`,
    });
  }
};

const getMyShop = async (req, res) => {
  try {
    const shop = await ShopModel.findOne({ owner: req.userId })
      .populate("owner")
      .populate({
        path: "items",
        options: { sort: { updatedAt: -1 } },
      });
    if (!shop) {
      return null;
    }
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(404).json({
      message: `Get my shop error ${error}`,
    });
  }
};

module.exports = { createAndEditShop, getMyShop };
