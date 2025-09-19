/*updateProfile, deleteResume, getPublicProfile  */
const express = require("express");
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      resume,
      companyDescription,
      companyLogo,
      companyName,
    } = req.body;
    // const user = req.user;
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });
    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.resume = resume || user.resume;

    if (user.role === "employeer") {
      user.companyName = companyName || user.companyName;
      user.companyDescription = companyDescription || user.companyDescription;
      user.companyLogo = companyLogo || user.companyLogo;
    }

    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      companyName: user.companyName,
      companyDescription: user.companyDescription,
      companyLogo: user.companyLogo,
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;
    /* extract file name from url */
    const fileName = resumeUrl?.split("/")?.pop();
    const user = await User.findById(req.user._id);
    // const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "jobseeker")
      return res
        .status(403)
        .json({ message: "Only jobseeker can delete resume" });

    // /* construct full file path */
    // const filePath = path.join(__dirname, "../uploads", fileName);

    // /* check if file exist and then delete */
    // if (fs.existsSync(filePath)) {
    //   fs.unlinkSync(filePath);
    // }

    // extract public_id from Cloudinary URL
    const publicId = resumeUrl.split("/").pop().split(".")[0];

    // delete from Cloudinary
    await cloudinary.uploader.destroy(`Hirix/${publicId}`, {
      resource_type: "raw",
    }); // use raw for pdf/doc/docx

    // clear from DB
    user.resume = "";
    await user.save();

    /* set the user resume to and empty string */
    user.resume = "";
    await user.save();
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { updateProfile, deleteResume, getPublicProfile };
