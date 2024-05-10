const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  updateUserInfo,
  updateUserPassword,
  updateUserAvatar,
} = require("../controllers/user.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", authenticate, logoutUser);

router.get("/refresh", updateAccessToken);

router.get("/me", authenticate, getUserInfo);

router.put("/update-info", authenticate, updateUserInfo);

router.put("/update-password", authenticate, updateUserPassword);

router.put("/update-avatar", authenticate, updateUserAvatar);

module.exports = router;
