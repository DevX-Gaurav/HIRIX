const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getEmployeerAnalytics,
} = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/overview", protect, getEmployeerAnalytics);

module.exports = router;
