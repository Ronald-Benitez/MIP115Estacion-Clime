import express from 'express';
import {Server as WebSocketServer} from 'socket.io'
import http from 'http';
import cors from 'cors';
require("./db/db");

const app = express();
const httServer = http.createServer(app);

const io = new WebSocketServer(httServer);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const socketrouter = require("./routes/socketrouter")(io);

app.use(express.static(__dirname+'/public'));
app.use('/api',socketrouter);

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