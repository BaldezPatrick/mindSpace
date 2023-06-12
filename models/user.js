const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const User = db.define("user", {
  name: {
    require: true,
    type: DataTypes.STRING,
  },
  email: {
    require: true,
    type: DataTypes.STRING,
  },
  password: {
    require: true,
    type: DataTypes.STRING,
  },
});

module.exports = User;
