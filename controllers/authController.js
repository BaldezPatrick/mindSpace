const User = require("../models/user");
const bcrypt = require("bcryptjs");

class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      req.flash("message", "Password doesn't match");
      res.render("auth/register");

      return;
    }

    const checkEmail = await User.findOne({ where: { email: email } });

    if (checkEmail) {
      req.flash("message", "E-mail already registered.");
      res.render("auth/register");

      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      req.session.userId = createdUser.id;
      req.flash("message", "Registration completed successfully.");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthController;
