// const multer = require("multer");

// /* configure storage */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// /* file filter */
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//     "application/pdf",
//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Only .jpeg, .jpg, .png, and .pdf formats are allowed"),
//       false
//     );
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// 🔹 Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Configure storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Hirix", // all images will be inside this folder on Cloudinary
    allowed_formats: ["jpeg", "jpg", "png", "pdf"],
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`, // unique name
  },
});

const upload = multer({ storage });

module.exports = upload;
