const Order = require("../models/Order");
const ErrorHandler = require("../utils/errorHandler");

const newOrder = async (data, res, next) => {
  try {
    const order = await Order.create(data);
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllOrdersService = async (res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    orders,
  });
};

module.exports = {
  newOrder,
  getAllOrdersService,
};
