const express = require("express");
const { signUp, signIn, signOut } = require("../controllers/auth.controller");

const AuthRouter = express.Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/signin", signIn);
AuthRouter.post("/signout", signOut);

module.exports = AuthRouter;
