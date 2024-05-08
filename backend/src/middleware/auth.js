const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/User.js");
require("dotenv").config();

async function authenticate(req, res, next) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
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

module.exports = { authenticate, authorize };
