const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/User.js");
const {
  sendToken,
  accessTokenOptions,
  refreshTokenOptions,
} = require("../utils/jwt.js");
const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/user.service.js");

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

const logoutUser = async (req, res, next) => {
  try {
    res.cookie("accessToken", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateAccessToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.cookies.refreshToken,
      process.env.REFRESH_TOKEN
    );
    if (!decoded) {
      return next(new ErrorHandler("Could not refresh token", 400));
    }
    const session = await User.findById(decoded.id);
    if (!session) {
      return next(new ErrorHandler("User not found", 404));
    }
    const accessToken = session.getSignedToken();
    const refreshToken = session.getRefreshToken();
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    getUserById(userId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
};
