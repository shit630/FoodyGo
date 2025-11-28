const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { addItem, editItem } = require("../controllers/item.controller");
const upload = require("../middleware/multer");

const ItemRoute = express.Router();

ItemRoute.post("/addItem", authMiddleware, upload.single("image"), addItem);
ItemRoute.patch(
  "/editItem/:itemId",
  authMiddleware,
  upload.single("image"),
  editItem
);

module.exports = ItemRoute;
