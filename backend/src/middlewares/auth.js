const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/User.js");
require("dotenv").config();

async function isAuthenticated(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken && !refreshToken) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  if (!accessToken && refreshToken) {
    return next(new ErrorHandler("Token Expired!", 401));
  }
  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
  if (!decoded) {
    return next(new ErrorHandler("Invalid access token", 401));
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  req.user = user;
  next();
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
}

module.exports = { isAuthenticated, authorize };
