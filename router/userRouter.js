/**
 * external import
 */
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

/**
 * internal import
 */
const {
  getUser,
  addUser,
  removeUser,
} = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/uservalidators");

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

/**
 * remove user
 */
router.delete("/:id", removeUser);

module.exports = router;
