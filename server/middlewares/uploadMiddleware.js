const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

/* Configure cloudinary */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* Configure storage engine for multer */
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Hirix" /* all images will be inside this folder on Cloudinary */,
    allowed_formats: ["jpeg", "jpg", "png", "pdf", "svg"],
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}` /* unique name */,
  },
});
/* File filter (extra safety) */
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "image/svg+xml" /* added svg */,
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, JPG, PDF, and SVG allowed."
      ),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
