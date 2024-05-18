const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
} = require("../controllers/order.controller");
const { isAuthenticated, authorize } = require("../middlewares/auth");

router.post("/create-order", isAuthenticated, createOrder);

router.get(
  "/get-all-orders",
  isAuthenticated,
  authorize("admin"),
  getAllOrders
);

module.exports = router;
