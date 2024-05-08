const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/User.js");
const sendToken = require("../utils/jwt.js");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return next(new ErrorHandler("Email is already taken", 400));
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  registerUser,
  loginUser,
};
