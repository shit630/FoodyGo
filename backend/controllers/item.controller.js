const ItemModel = require("../models/item.model");
const ShopModel = require("../models/shop.model");
const uploadOnCludinary = require("../utils/cloudinary");

const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCludinary(req.file.path);
    }
    const shop = await ShopModel.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({
        message: "Shop not found",
      });
    }
    const item = await ItemModel.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });

    shop.items.push(item._id);
    await shop.save();
    await shop.populate("owner");
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });

    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({
      message: `Add item error ${error}`,
    });
  }
};

const editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCludinary(req.file.path);
    }
    const item = await ItemModel.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        foodType,
        price,
        image,
      },
      { new: true }
    );

    if (!item) {
      return res.status(400).json({
        message: "Item not found",
      });
    }

    const shop = await ShopModel.findOne({ owner: req.userId }).populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });

    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({
      message: `Edit item error ${error}`,
    });
  }
};

const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await ItemModel.findById(itemId);
    if (!item) {
      return res.status(400).json({
        message: "Item not found",
      });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({
      message: `Get single item error ${error}`,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await ItemModel.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(400).json({
        message: "Item not found",
      });
    }

    const shop = await ShopModel.findOne({ owner: req.userId });
    shop.items = shop.items.filter((item) => item._id != itemId);
    await shop.save();
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({
      message: `Delete item error ${error}`,
    });
  }
};

module.exports = { addItem, editItem, getItemById, deleteItem };
