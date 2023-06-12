const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const User = require("../models/user");
const Idea = db.define("idea", {
  title: {
    allowNull: false,
    require: true,
    type: DataTypes.STRING,
  },
});

Idea.belongsTo(User);
User.hasMany(Idea);

module.exports = Idea;
