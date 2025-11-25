const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const getCurrentUser = require("../controllers/user.controller");

const UserRoute = express.Router();

UserRoute.get("/currentUser", authMiddleware, getCurrentUser);

module.exports = UserRoute;
