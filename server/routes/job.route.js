const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createJob,
  getJobs,
  getJobsById,
  updateJob,
  deleteJob,
  toogleCloseJob,
  getJobsEmployeer,
} = require("../controllers/job.controller");

const router = express.Router();

router.route("/").post(protect, createJob).get(getJobs);
router.route("/get-jobs-employeer").get(protect, getJobsEmployeer);
router
  .route("/:id")
  .get(getJobsById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);
router.put("/:id/toggle-close", protect, toogleCloseJob);

module.exports = router;
