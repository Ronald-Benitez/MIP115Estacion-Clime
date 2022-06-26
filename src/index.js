import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import cors from "cors";
require("dotenv").config();
const { registro } = require("../src/db/db.js");

const app = express(); //Crea una instancia de express
const httServer = http.createServer(app); //Crea una instancia de http

const io = new WebSocketServer(httServer); //Crea una instancia de socket.io

app.use(cors()); //Permite que se conecte desde cualquier lugar
app.use(express.json()); //Permite que se reciban datos en formato json
app.use(express.urlencoded({ extended: true })); //Permite que se reciban datos en formato urlencoded

const socketrouter = require("./routes/socketrouter")(io); //Importa el router de socket.io

app.use(express.static(__dirname + "/public")); //Permite que se puedan acceder a los archivos estaticos
app.use("/api", socketrouter); //Permite que se puedan acceder a las rutas de la api

io.on("connection", async (socket) => {
  //Se conecta un cliente
  console.log("a user connected", socket.id); //Muestra en consola el id del cliente
  const registros = await registro.sequelize.query(
    //Obtiene los ultimos 10 registros
    `SELECT * FROM registros ORDER BY id DESC LIMIT 20`
  );
  socket.emit("server:post", registros); //Envia los datos al cliente
});

const port = process.env.PORT || 3000; //Obtiene el puerto de la variable de entorno
console.log(port);

httServer.listen(port);
console.log("Server running on port 3000");
