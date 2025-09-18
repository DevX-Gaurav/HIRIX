const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded?.id)?.select("-password");
      next();
    } else {
      res.status(401).json({
        message: "Not authorized, not token available",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "token failed due to some reasons.",
      error: error.message,
    });
  }
};

module.exports = { protect };
