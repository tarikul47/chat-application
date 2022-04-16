function getUser(req, res, next) {
  res.render("users");
}

function addUser(req, res, next){
  res.json({
    "message": "users added successfully"
  });
}

module.exports = {
  getUser,
  addUser
};
