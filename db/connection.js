require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Conexão estabelecida.");
} catch (error) {
  console.log("Conexão não estabelecida: ", error);
}

module.exports = sequelize;
