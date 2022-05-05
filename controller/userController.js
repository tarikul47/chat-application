const bcrypt = require("bcrypt");
const People = require("../models/People");

function getUser(req, res, next) {
  res.render("users");
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

module.exports = {
  getUser,
  addUser,
};
