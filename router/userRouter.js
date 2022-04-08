/**
 * external import
 */
const express = require("express");
const router = express.Router();

/**
 * internal import
 */
const { userController } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

/**
 * Login page router
 */
router.get("/", decorateHtmlResponse("Users"), userController);

module.exports = router;
