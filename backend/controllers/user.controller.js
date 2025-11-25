const UserModel = require("../models/user.model");

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).josn({
        message: "User id is not found",
      });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).josn({
        message: "User not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: `Get current user error ${error}`,
    });
  }
};

module.exports = getCurrentUser;
