const Job = require("../models/jobModel");
const User = require("../models/userModel");
const Application = require("../models/applicationModel");
const SavedJobs = require("../models/savedJobsModel");

/* creating a new job (Employeer only) */
const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employeer")
      return res.status(403).json({
        message: "Only employeers can post jobs.",
      });
    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const { keyword, location, category, type, minSalary, maxSalary, userId } =
      req.query;
    const query = {
      isClosed: false,
      ...(keyword && { title: { $regex: keyword, $options: "i" } }),
      ...(location && { location: { $regex: location, $options: "i" } }),
      ...(category && { category }),
      ...(type && { type }),
    };
    if (minSalary || maxSalary) {
      query.$and = [];
      if (minSalary) {
        query.$and.push({ salaryMax: { $gte: Number(minSalary) } });
      }
      if (maxSalary) {
        query.$and.push({ salaryMin: { $lte: Number(maxSalary) } });
      }
      if (query.$and.length === 0) {
        delete query.$and;
      }
    }
    const jobs = await Job.find(query).populate(
      "company",
      "name companyName companyLogo"
    );
    let savedJobIds = [];
    let appliedJobStatusMap = {};
    if (userId) {
      /* saved jobs */
      const savedJobs = await SavedJobs.find({ jobseeker: userId }).select(
        "job"
      );
      savedJobIds = savedJobs.map((s) => String(s.job));

      /* application */
      const applications = await Application.find({ applicant: userId }).select(
        "job status"
      );
      applications.forEach((app) => {
        appliedJobStatusMap[String(app.job)] = app.status;
      });
    }

    /* add isSaved and applicationStatus to each job */
    const jobsWithExtras = jobs.map((job) => {
      const jobIdStr = String(job.id);
      return {
        ...job.toObject(),
        isSaved: savedJobIds.includes(jobIdStr),
        applicationStatus: appliedJobStatusMap[jobIdStr] || null,
      };
    });

    res.json(jobsWithExtras);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* get jobs for logged in user(Employeer can see posted jobs) */
const getJobsEmployeer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role } = req.user;
    if (role !== "employeer") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    /* get all jobs posted by employeer */
    const jobs = await Job.find({ company: userId })
      .populate("company", "name companyName companyLogo")
      .lean(); /* .lean() makes jobs plain js objects so we can add new fields */

    /* count applications for each jobs */
    const jobsWithApplicationCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({
          job: job._id,
        });
        return {
          ...job,
          applicationCount,
        };
      })
    );
    res.json(jobsWithApplicationCounts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* get single job by id */
const getJobsById = async (req, res) => {
  try {
    const { userId } = req.query;
    const job = await Job.findById(req.params.id).populate(
      "company",
      "name companyName companyLogo"
    );
    if (!job) {
      return res.status(404).json({ message: "job not found" });
    }
    let applicationStatus = null;
    let isSaved = false;
    if (userId) {
      const application = await Application.findOne({
        job: job._id,
        applicant: userId,
      }).select("status");
      if (application) {
        applicationStatus = application.status;
      }
      const savedJob = await SavedJobs.findOne({
        job: job._id,
        jobseeker: userId,
      });
      if (savedJob) {
        isSaved = true;
      }
    }

    res.json({
      ...job.toObject(),
      applicationStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* update job (Employeer only) */
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
      });
    }
    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this job",
      });
    }
    Object.assign(job, req.body);
    const updated = await job.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* delete a job (Employeer only) */
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.company.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "not authorized to delete this job" });
    }
    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* toggle close status for a job (Employeer only) */
const toogleCloseJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.company.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to close this job" });
    }
    job.isClosed = !job.isClosed;
    await job.save();
    res.json({
      message: job.isClosed
        ? "Job marked as closed successfully"
        : "Job marked as active successfully",
      isClosed: job.isClosed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobsById,
  updateJob,
  deleteJob,
  toogleCloseJob,
  getJobsEmployeer,
};
