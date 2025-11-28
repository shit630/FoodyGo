const multer = require("multer");

const stroage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ stroage });

module.exports = upload;
