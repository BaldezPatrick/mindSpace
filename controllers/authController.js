const User = require("../models/user");
const bcrypt = require("bcryptjs");

class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "User not found");
      res.render("auth/login");

      return;
    }

    const loginAttemptsKey = `loginAttempts_${user.id}`;

    const loginAttempts = req.session[loginAttemptsKey] || 0;

    if (loginAttempts >= 2) {
      const blockLogin = 1 * 60 * 1000;
      const lastLoginAttemptTime = req.session.lastLoginAttemptTime || 0;
      const currentTime = new Date().getTime();

      if (currentTime - lastLoginAttemptTime < blockLogin) {
        req.flash(
          "message",
          "Too many login attempts. Please try again later."
        );
        res.render("auth/login");

        return;
      }
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      req.flash("message", "Invalid password");
      req.session[loginAttemptsKey] = (req.session[loginAttemptsKey] || 0) + 1;
      req.session.lastLoginAttemptTime = new Date().getTime();
      res.render("auth/login");
      return;
    }

    req.session[loginAttemptsKey] = 0;
    req.session.lastLoginAttemptTime = 0;

    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect("/");
    });
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

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}

module.exports = AuthController;
