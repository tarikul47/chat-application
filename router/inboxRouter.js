/**
 * external import
 */
 const express = require("express");
 const router = express.Router();
 
 /**
  * internal import
  */
 const {inboxController} = require("../controller/inboxController");
 const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
 const {checkLogin,redirectLoggedIn} = require("../middlewares/common/checkLogin");

 
 /**
  * Login page router
  */
 router.get("/", decorateHtmlResponse("Inbox"), checkLogin ,inboxController);
 
 module.exports = router;
 