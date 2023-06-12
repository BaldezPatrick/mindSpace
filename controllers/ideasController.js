const Idea = require("../models/idea");
const User = require("../models/user");

class IdeasController {
  static async showIdeas(req, res) {
    res.render("ideas/home");
  }
}

module.exports = IdeasController;
