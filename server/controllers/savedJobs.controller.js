const Job = require("../models/jobModel");
const User = require("../models/userModel");
const Application = require("../models/applicationModel");
const SavedJobs = require("../models/savedJobsModel");

const saveJob = async (req, res) => {
  try {
    const exists = await SavedJobs.findOne({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    if (exists) return res.status(400).json({ message: "Job already present" });
    const saved = await SavedJobs.create({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unsaveJob = async (req, res) => {
  try {
    await SavedJobs.findOneAndDelete({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    return res.json({ message: "Job removed from the saved list" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMySavedJobs = async (req, res) => {
  try {
    const savedJob = await SavedJobs.find({
      jobseeker: req.user._id,
    }).populate({
      path: "job",
      populate: {
        path: "company",
        select: "name companyName companyLogo",
      },
    });
    return res.json(savedJob);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveJob,
  unsaveJob,
  getMySavedJobs,
};
