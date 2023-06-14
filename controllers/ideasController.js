const Idea = require("../models/idea");
const User = require("../models/user");
const { Op } = require("sequelize");

class IdeasController {
  static async showIdeas(req, res) {
    let search = "";

    if (req.query.search) {
      search = req.query.search;
    }

    let order = "DESC";

    if (req.query.order === "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }

    const ideaData = await Idea.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]],
    });

    const idea = ideaData.map((idea) => idea.get({ plain: true }));

    let ideasLength = idea.length;

    if (ideasLength === 0) {
      ideasLength = false;
    }

    res.render("ideas/home", { idea, search, ideasLength });
  }

  static async dashboard(req, res) {
    const userId = req.session.userId;

    if (!userId) {
      res.render("auth/login");
      return;
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: { model: Idea },
      plain: true,
    });

    const ideas = user.ideas.map((item) => item.dataValues);
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
    const id = req.body.id;
    const userId = req.session.userId;

    await Idea.destroy({ where: { id: id, userId: userId } });

    req.flash("message", "The idea was deleted.");

    req.session.save(() => {
      res.redirect("/dashboard-ideas");
    });
  }

  static async editIdea(req, res) {
    const id = req.params.id;
    const idea = await Idea.findOne({ where: { id: id }, raw: true });

    res.render("ideas/edit", { idea });
  }

  static async editIdeaSave(req, res) {
    const id = req.body.id;

    const idea = {
      title: req.body.title,
    };

    await Idea.update(idea, { where: { id: id } });

    req.flash("message", "Idea was edited.");

    req.session.save(() => {
      res.redirect("/dashboard-ideas");
    });
  }
}

module.exports = IdeasController;
