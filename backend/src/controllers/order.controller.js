const ErrorHandler = require("../utils/errorHandler");
const Order = require("../models/Order");
const Course = require("../models/Course");
const User = require("../models/User");
const Notification = require("../models/Notification");

const createOrder = async (req, res, next) => {
  try {
    const { courseId, paymentInfo } = req.body;
    const course = await Course.findById(courseId);
    const user = await User.findById(req.user._id);
    const isUserHaveCourse = user.courses.includes(courseId);
    if (isUserHaveCourse) {
      return next(new ErrorHandler("You already have this course", 400));
    }
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    const data = {
      courseId,
      userId: user._id,
      paymentInfo,
    };
    const order = await Order.create(data);
    user.courses.push(courseId);
    await user.save();
    const notification = await Notification.create({
      user: user._id,
      title: "New order",
      message: `You have a new order from ${course.name} course`,
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = { createOrder };
