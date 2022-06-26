import express from "express";
const {registro} = require("../db/db.js")

const socketrouter = (io)=>{
    const router = express.Router();
    router.get('/',async (req,res)=>{
        const registros = await registro.sequelize.query(
            `SELECT * FROM registros ORDER BY id DESC LIMIT 10`
        );
        res.json(registros);
    });

    router.post("/",async (req,res)=>{
        const reg = await registro.create(req.body);
        const regs = await registro.sequelize.query(
            `SELECT * FROM registros ORDER BY id DESC LIMIT 10`
        );
        res.json(regs);
        io.emit('server:post',regs);
    });

    return router;
}

module.exports = socketrouter;