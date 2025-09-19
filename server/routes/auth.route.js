const express = require("express");

const { login, register, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get", protect, getMe);

// router.post("/upload-image", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({
//       message: "No file uploaded",
//     });
//   }
//   const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
//     req.file.filename
//   }`;
//   res.status(200).json({ imageUrl });
// });

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  // Cloudinary gives URL in req.file.path
  res.status(200).json({ imageUrl: req.file.path });
});

module.exports = router;
