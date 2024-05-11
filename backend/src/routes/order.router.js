const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth");

router.post("/create-order", authenticate, createOrder);

module.exports = router;
