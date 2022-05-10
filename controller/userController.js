const bcrypt = require("bcrypt");
const People = require("../models/People");
const { unlink } = require("fs");
const { path } = require("path");

async function getUser(req, res, next) {
  try {
    const users = await People.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res, next) {
  //console.log(req.body, req.files);
  let newUser;
  const hashpassword = await bcrypt.hash(req.body.password, 10);
  //console.log(hashpassword);
  if (req.files && req.files.length > 0) {
    newUser = new People({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashpassword,
    });
  } else {
    newUser = new People({
      ...req.body,
      password: hashpassword,
    });
  }

  // save the user
  try {
    await newUser.save();
    res.status(200).json({
      message: "User was added Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

// remove user
async function removeUser(req, res, next) {
  try {
    const user = await People.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        //path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
       `${__dirname}/../public/uploads/avatars/${user.avatar}`,
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}

module.exports = {
  getUser,
  addUser,
  removeUser,
};
