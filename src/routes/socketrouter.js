import express from "express";
const { registro } = require("../db/db.js");

const socketrouter = (io) => {
  const router = express.Router(); //Rutas de express

  router.post("/", async (req, res) => {
    //Ruta de la api para ingreso de datos
    const reg = await registro.create(req.body); //Crea un nuevo registro
    const regs = await registro.sequelize.query(
      `SELECT * FROM registros ORDER BY id DESC LIMIT 20`
    );
    res.json(regs);
    io.emit("server:post", regs); //Envia los datos al cliente
  });

  return router;
};

module.exports = socketrouter;
