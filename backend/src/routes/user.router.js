const express = require("express");
const router = express.Router();
const { isAuthenticated, authorize } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  updateUserInfo,
  updateUserPassword,
  updateUserAvatar,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getUserAnalytics,
} = require("../controllers/user.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isAuthenticated, logoutUser);

router.get("/refresh", updateAccessToken);

router.get("/me", isAuthenticated, getUserInfo);

router.put("/update-info", isAuthenticated, updateUserInfo);

router.put("/update-password", isAuthenticated, updateUserPassword);

router.put("/update-avatar", isAuthenticated, updateUserAvatar);

router.get("/get-all-users", isAuthenticated, authorize("admin"), getAllUsers);

router.put("/update-role", isAuthenticated, authorize("admin"), updateUserRole);

router.delete("/delete/:id", isAuthenticated, authorize("admin"), deleteUser);

router.get("/analytics", isAuthenticated, authorize("admin"), getUserAnalytics);

module.exports = router;
