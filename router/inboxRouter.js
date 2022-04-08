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
 
 /**
  * Login page router
  */
 router.get("/", decorateHtmlResponse("Inbox"),inboxController);
 
 module.exports = router;
 