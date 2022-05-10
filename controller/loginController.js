const People = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// get login page
function getLogin(req, res, next) {
  res.render("index");
}

// do login
async function login(req, res, next) {
  try {
    // check user who has email/username
    const user = await People.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPasword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPasword) {
        // prepare user object
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        //generate
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: parseInt(process.env.JWT_EXPIRY),
        });
        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: parseInt(process.env.JWT_EXPIRY),
          httpOnly: true,
          signed: true,
        });

        // set logged in user local idetifier
        res.locals.loggedInUser = userObject;
        res.render("inbox");
      } else {
        throw createError("Login Failed! Please try again!");
      }
    } else {
      throw createError("Login Failed! Please try again!");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// do logout
function logout(req, res, next) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged Out");
}

module.exports = {
  getLogin,
  login,
  logout
};
