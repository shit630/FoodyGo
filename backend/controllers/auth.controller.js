const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const sendOtpMail = require("../utils/mail");

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already exist.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    if (mobile.length < 10) {
      return res.status(400).json({
        message: "Mobile number must be at least 10 numbers",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = await UserModel.create({
      fullName,
      email,
      role,
      mobile,
      password: hashPassword,
    });

    const token = await generateToken(user._id, role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(`Signup error ${error}`);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = await generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(`Signin error ${error}`);
  }
};

const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json(`Signout error ${error}`);
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist.",
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({
      message: "OTP send Successfully",
    });
  } catch (error) {
    res.status(500).json(`Send OTP error ${error}`);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({
        message: "Invalid/Expried otp",
      });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    return res.status(200).json({
      message: "OTP Verify Successfully",
    });
  } catch (error) {
    res.status(500).json(`Verify OTP error ${error}`);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({
        message: "OTP Varification Required",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({
      message: "Passwors Reset Successfully",
    });
  } catch (error) {
    res.status(500).json(`Reset Password error ${error}`);
  }
};

const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = await generateToken(user._id, role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(`Google Auth error ${error}`);
  }
};
module.exports = {
  signUp,
  signIn,
  signOut,
  sendOTP,
  verifyOtp,
  resetPassword,
  googleAuth,
};
