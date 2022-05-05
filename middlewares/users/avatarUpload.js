const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const uploader = require("../../utilities/uploader");


function avatarUpload(req, res, next) {
  const upload = uploader("avatars",["image/jpeg", "image/jpg", "image/png"],1000000,"Only .jpg, jpeg or .png format allowed!");

  upload.any()(req, res, function (err) {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    }else{
      next()
    }
  });

  // call the middleware function
  // upload.any()(req, res, (err) => {
  //   if (err) {
  //     res.status(500).json({
  //       errors: {
  //         avatar: {
  //           msg: err.message,
  //         },
  //       },
  //     });
  //   } else {
  //     next();
  //   }
  // });
}
module.exports = avatarUpload;
