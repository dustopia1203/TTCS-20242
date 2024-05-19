const express = require("express");
const router = express.Router();
const {
  createLayout,
  editLayout,
  getLayoutByType,
} = require("../controllers/layout.controller");
const { isAuthenticated, authorize } = require("../middlewares/auth");

router.post("/create", isAuthenticated, authorize("admin"), createLayout);

router.put("/edit", isAuthenticated, authorize("admin"), editLayout);

router.get("/:type", getLayoutByType);

module.exports = router;
