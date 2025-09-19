const express = require("express");

const { login, register, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/authMiddleware");
const {upload,getCloudinaryFileUrl} = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get", protect, getMe);

// router.post("/upload-image", upload.single("image"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
//     console.log("Cloudinary upload success:", req.file);
//     res.status(200).json({ imageUrl: req.file.path });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: error.message || "Upload failed" });
//   }
// });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    let url;
    if (file.mimetype === "application/pdf") {
      url = getCloudinaryFileUrl(file.path, "raw");
    } else {
      url = upload.getCloudinaryFileUrl(file.path, "image");
    }

    res.json({ fileUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
