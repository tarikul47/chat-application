const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(sub_folders, allowed_files_types,max_file_size,err_msg) {
  //const UPLOADS_FOLDER = path.join(__dirname, `../uploads/${sub_folders}`);
  const UPLOADS_FOLDER = path.join(__dirname, `../public/uploads/${sub_folders}`);
  //console.log(UPLOADS_FOLDER);
  // storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_files_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(err_msg));
      }
    },
  });

  return upload;
}
module.exports = uploader;
