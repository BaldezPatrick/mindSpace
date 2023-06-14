const Idea = require("../models/idea");
const User = require("../models/user");

class IdeasController {
  static async showIdeas(req, res) {
    res.render("ideas/home");
  }

  static async dashboard(req, res) {
    const userId = req.session.userId;

    if(!userId) {
      res.render("auth/login")
      return;
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: {model: Idea},
      plain: true,
    });

    const ideas = user.ideas.map((item) => item.dataValues)
    var emptyIdeas = ideas.length === 0;

    res.render("ideas/dashboard", { ideas, emptyIdeas });
  }

  static addIdea(req, res) {
    res.render("ideas/createIdea");
  }

  static async addIdeaSave(req, res) {
    const idea = {
      title: req.body.title,
      userId: req.session.userId,
    };

    try {
      await Idea.create(idea);
      req.flash("message", "Idea posted!");
      req.session.save(() => {
        res.redirect("/dashboard-ideas");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async removeIdea(req, res) {
    const id = req.body.id
    const userId = req.session.userId

    await Idea.destroy({where: {id: id, userId: userId}})
    
    req.flash('message', "The idea was deleted.")

    req.session.save(() => {
      res.redirect('/dashboard-ideas')
    })

  }
}

module.exports = IdeasController;
