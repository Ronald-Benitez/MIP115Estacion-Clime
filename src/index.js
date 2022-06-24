import express from 'express';
import {Server as WebSocketServer} from 'socket.io'
import http from 'http';
const bodyParser = require('body-parser');
require("./db/db");

const app = express();
const httServer = http.createServer(app);

const io = new WebSocketServer(httServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));

// app.get('/',(req,res)=>{
//     res.send('Hello World');
// })

io.on('connection',(socket)=>{
    console.log('a user connected',socket.id);
    socket.on('client:newnote',data=>{
        console.log(data)
    })
});


httServer.listen(3000);
console.log('Server running on port 3000');