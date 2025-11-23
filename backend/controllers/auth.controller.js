const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");

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

    res.status(201).json({ msg: "Login success", user });
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

module.exports = { signUp, signIn, signOut };
