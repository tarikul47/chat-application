/**
 * external import
 */
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

/**
 * internal import
 */
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const {checkLogin,redirectLoggedIn} = require("../middlewares/common/checkLogin");

// set page titile
const page_title = "Login";

/**
 * Login page router
 */
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

/**
 * process login
 */
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);


//logout 
router.delete("/", logout);
module.exports = router;
