var jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "Token not found",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(400).json({
        message: "Token not verifyed",
      });
    }
    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (error) {
    return res.status(500).json({
      message: `Auth middleware error ${error}`,
    });
  }
};

module.exports = authMiddleware;
