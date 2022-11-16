const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER_NAME,
  process.env.DB_PASS,
  {
    host: process.env.HOST,
    dialect: "postgres",
  }
);

module.exports = sequelize;
