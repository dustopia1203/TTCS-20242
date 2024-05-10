const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/User.js");
const {
  sendToken,
  accessTokenOptions,
  refreshTokenOptions,
} = require("../utils/jwt.js");
const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/user.service.js");
const cloudinary = require("cloudinary").v2;

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
    req.user = session;
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

const updateUserInfo = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      if (email) {
        const isEmailTaken = await User.findOne({ email });
        if (isEmailTaken) {
          return next(new ErrorHandler("Email is already taken", 400));
        }
        user.email = email;
      }
      if (name) {
        user.name = name;
      }
    }
    await user.save();
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please enter old and new password", 400));
    }
    const user = await User.findById(req.user._id).select("+password");
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid password", 400));
    }
    user.password = newPassword;
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (avatar && user) {
      if (user.avatar.public_id) {
        // if user already has an avatar, delete it from cloudinary
        await cloudinary.uploader.destroy(user.avatar.public_id);
        // then upload the new avatar
        const imageHolder = await cloudinary.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: imageHolder.public_id,
          url: imageHolder.secure_url,
        };
      } else {
        const imageHolder = await cloudinary.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: imageHolder.public_id,
          url: imageHolder.secure_url,
        };
      }
    }
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
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
  updateUserInfo,
  updateUserPassword,
  updateUserAvatar,
};
