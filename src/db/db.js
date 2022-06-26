const sequelize = require("sequelize");
require("dotenv").config();

const registroModel = require("./models/registro");

//Database connection
const db = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const registro = registroModel(db, sequelize); //Crea una instancia de registroModel
db.sync({ force: false })
  .then(() => {
    //Crea la tabla registros
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  registro,
};
