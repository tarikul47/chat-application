/**
 * external import
 */
const express = require("express");
const router = express.Router();

/**
 * internal import
 */
const {loginController} = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

/**
 * Login page router
 */
router.get("/", decorateHtmlResponse("Login"), loginController);

module.exports = router;
