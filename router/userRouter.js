/**
 * external import
 */
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

/**
 * internal import
 */
const { getUser, addUser } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/uservalidators");

/**
 * Login page router
 */
router.get("/", decorateHtmlResponse("Users"), getUser);

/**
 * User Added router
 */
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
//router.post("/", addUser);

module.exports = router;
