const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {} = require("../controllers/application.controller");
const {
  applyToJob,
  getMyApplications,
  getApplicationsForJob,
  getApplicationById,
  updateStatus,
} = require("../controllers/application.controller");

const router = express.Router();
router.post("/:jobId", protect, applyToJob);
router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationsForJob);
router.get("/:id", protect, getApplicationById);
router.put("/:id/status", protect, updateStatus);

module.exports = router;
