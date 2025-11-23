const JWT = require("jsonwebtoken");
const generateToken = async (userId, role) => {
  try {
    const token = await JWT.sign(
      { userId: userId, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateToken;
