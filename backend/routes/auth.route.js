const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  sendOTP,
  verifyOtp,
  resetPassword,
  googleAuth,
} = require("../controllers/auth.controller");

const AuthRouter = express.Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/signin", signIn);
AuthRouter.post("/signout", signOut);
AuthRouter.post("/sendOtp", sendOTP);
AuthRouter.post("/verifyOtp", verifyOtp);
AuthRouter.post("/resetPassword", resetPassword);
AuthRouter.post("/googleAuth", googleAuth);

module.exports = AuthRouter;
