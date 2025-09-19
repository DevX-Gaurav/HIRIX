// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("cloudinary").v2;

// // /* Configure Cloudinary */
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // /* Storage engine */
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: async (req, file) => {
// //     const extension = file.originalname.split(".").pop();
// //     if (file.mimetype === "application/pdf") {
// //       return {
// //         folder: "Hirix/Resumes",
// //         resource_type: "raw",
// //         public_id: `${Date.now()}-${
// //           file.originalname.split(".")[0]
// //         }.${extension}`,
// //       };
// //     } else {
// //       return {
// //         folder: "Hirix/Images",
// //         resource_type: "image",
// //         allowed_formats: ["jpeg", "jpg", "png", "svg"],
// //         public_id: `${Date.now()}-${
// //           file.originalname.split(".")[0]
// //         }.${extension}`,
// //       };
// //     }
// //   },
// // });

// // /* File filter */
// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = [
// //     "image/jpeg",
// //     "image/png",
// //     "image/jpg",
// //     "application/pdf",
// //     "image/svg+xml",
// //   ];

// //   if (allowedTypes.includes(file.mimetype)) {
// //     cb(null, true);
// //   } else {
// //     cb(
// //       new Error(
// //         "Invalid file type. Only JPEG, PNG, JPG, PDF, and SVG allowed."
// //       ),
// //       false
// //     );
// //   }
// // };

// // const upload = multer({ storage, fileFilter });

// // /* Helper: Generate signed URL for raw files (PDFs) or normal URL for images */
// // const getCloudinaryFileUrl = (publicId, resourceType = "image") => {
// //   if (resourceType === "raw") {
// //     return cloudinary.url(publicId, {
// //       resource_type: "raw",
// //       type: "authenticated",
// //       sign_url: true,
// //     });
// //   }
// //   return cloudinary.url(publicId, { resource_type: "image" });
// // };

// // module.exports = {
// //   upload,
// //   getCloudinaryFileUrl, // export helper along with upload
// // };

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;

// /* Configure Cloudinary */
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// /* Multer Cloudinary storage */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const extension = file.originalname.split(".").pop();

//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "Hirix/Resumes",
//         resource_type: "raw", // important for PDFs
//         public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
//       };
//     } else {
//       return {
//         folder: "Hirix/Images",
//         resource_type: "image", // for images and SVG
//         allowed_formats: ["jpeg", "jpg", "png", "svg"],
//         public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
//       };
//     }
//   },
// });

// /* File filter */
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//     "image/svg+xml",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPEG, PNG, JPG, SVG, PDF allowed."), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// /* Helper to get URLs */
// const getCloudinaryFileUrl = (publicId, resourceType = "image") => {
//   if (resourceType === "raw") {
//     return cloudinary.url(publicId, {
//       resource_type: "raw",
//       type: "authenticated", // signed URL
//       sign_url: true,
//     });
//   }
//   return cloudinary.url(publicId, { resource_type: "image" });
// };

// module.exports = { upload, getCloudinaryFileUrl };

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

/* Configure Cloudinary */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* Multer Cloudinary storage */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const extension = file.originalname.split(".").pop();

    const isPdf = file.mimetype === "application/pdf";
    return {
      folder: isPdf ? "Hirix/Resumes" : "Hirix/Images",
      resource_type: isPdf ? "raw" : "image",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      format: extension, // <<< this is crucial
    };
  },
});

/* File filter */
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/svg+xml",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, JPG, SVG, PDF allowed."),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

/* Helper to get URLs */
const getCloudinaryFileUrl = (publicId, resourceType = "image") => {
  // for raw files (PDFs), just return normal raw URL
  if (resourceType === "raw") {
    return cloudinary.url(publicId, {
      resource_type: "raw",
    });
  }
  // for images
  return cloudinary.url(publicId, { resource_type: "image" });
};

module.exports = { upload, getCloudinaryFileUrl };
