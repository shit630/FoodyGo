const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createAndEditShop,
  editShop,
  getMyShop,
} = require("../controllers/shop.controller");
const upload = require("../middleware/multer");

const ShopRoute = express.Router();

ShopRoute.post(
  "/createAndEdit",
  authMiddleware,
  upload.single("image"),
  createAndEditShop
);

ShopRoute.get("/getMyShop", authMiddleware, getMyShop);

module.exports = ShopRoute;
