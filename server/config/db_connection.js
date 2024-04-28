require("dotenv").config();
const { Sequelize } = require("sequelize");
const NODE_ENV = process.env.NODE_ENV;
const config = require("./config")[NODE_ENV];

const sequelize = new Sequelize(config);

const check_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
check_connection();

module.exports = sequelize;
