const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  addItem,
  editItem,
  getItemById,
  deleteItem,
} = require("../controllers/item.controller");
const upload = require("../middleware/multer");

const ItemRoute = express.Router();

ItemRoute.post("/addItem", authMiddleware, upload.single("image"), addItem);
ItemRoute.patch(
  "/editItem/:itemId",
  authMiddleware,
  upload.single("image"),
  editItem
);

ItemRoute.get("/getItemById/:itemId", authMiddleware, getItemById);

ItemRoute.delete("/deleteItem/:itemId", authMiddleware, deleteItem);

module.exports = ItemRoute;
