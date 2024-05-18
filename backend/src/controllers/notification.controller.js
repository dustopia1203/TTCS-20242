const Notification = require("../models/Notification");
const ErrorHandler = require("../utils/errorHandler");
const cron = require("node-cron");

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateNotification = async (req, res, next) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return next(new ErrorHandler("Notification not found", 404));
    } else {
      notification.status
        ? (notification.status = "read")
        : notification?.status;
    }
    await notification.save();
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDayAgo },
  });
  console.log("Deleted read notifications");
});

module.exports = {
  getNotifications,
  updateNotification,
};
