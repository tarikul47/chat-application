const { use } = require("bcrypt/promises");
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const People = require("../../models/People");
const { unlink } = require("fs");
const { path } = require("path");

const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("must be at least 5 chars long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req).mapped(); //  object array
  if (Object.keys(errors).length === 0) {
    //console.log("Next");
    next();
  } else {
    //console.log("Error");
    if (req.files.length > 0) {
      const { filename } = req.files[0];
     // console.log("file has", req.files[0].path);
     // console.log("file has", path.join(__dirname, `../../uploads/avatars/${filename}`));
      unlink(
        req.files[0].path,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    res.status(500).json({
      //errors: errors,
      errors: errors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler
};
