const User = require("../models/user");
const bcrypt = require("bcryptjs");

class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

}

module.exports = AuthController;
