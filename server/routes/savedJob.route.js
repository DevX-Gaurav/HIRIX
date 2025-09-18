const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  saveJob,
  unsaveJob,
  getMySavedJobs,
} = require("../controllers/savedJobs.controller");

const router = express.Router();

router.post("/:jobId", protect, saveJob);
router.delete("/:jobId", protect, unsaveJob);
router.get("/my", protect, getMySavedJobs);

module.exports = router;
