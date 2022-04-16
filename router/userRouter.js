/**
 * external import
 */
const express = require("express");
const router = express.Router();

/**
 * internal import
 */
const { getUser, addUser } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");


/**
 * Login page router
 */
router.get("/", decorateHtmlResponse("Users"), getUser);

/**
 * User Added router 
 */
router.post("/", avatarUpload, addUser);
//router.post("/", addUser);


module.exports = router;
