const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Remote", "Full-Time", "Part-Time", "Internship", "Contract"],
      required: true,
    },
    location: {
      type: String,
    },
    category: {
      type: String,
    },
    salaryMin: {
      type: Number,
    },
    salaryMax: {
      type: Number,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
