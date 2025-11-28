const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createAndEditShop,
  editShop,
} = require("../controllers/shop.controller");
const upload = require("../middleware/multer");

const ShopRoute = express.Router();

ShopRoute.post(
  "/createAndEdit",
  authMiddleware,
  upload.single("image"),
  createAndEditShop
);
ShopRoute.patch(
  "/editShop/:shopId",
  authMiddleware,
  upload.single("image"),
  editShop
);

module.exports = ShopRoute;
