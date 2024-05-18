const express = require("express");
const router = express.Router();
const {
  getNotifications,
  updateNotification,
} = require("../controllers/notification.controller");
const { isAuthenticated, authorize } = require("../middlewares/auth");

router.get("/get-all", isAuthenticated, authorize("admin"), getNotifications);

router.put(
  "/update/:id",
  isAuthenticated,
  authorize("admin"),
  updateNotification
);

module.exports = router;
