import multer from "multer";

// Multer configuration for file uploads
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error("Only .png, .jpg, and .jpeg files are allowed."));
  }
};

export default multer({ storage, fileFilter });
