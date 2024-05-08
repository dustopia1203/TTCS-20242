const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
} = require("../controllers/user.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", authenticate, authorize("admin"), logoutUser);

router.get("/refresh", updateAccessToken);

router.get("/me", authenticate, getUserInfo);

module.exports = router;
