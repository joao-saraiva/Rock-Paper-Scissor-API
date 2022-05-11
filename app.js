const express = require("express");
const app = express();
var cors = require('cors')
const http = require('http');
const { Server } = require("socket.io");
const port = 3000;
var bodyParser = require('body-parser');
const { isObject } = require("util");
const server = http.createServer(app);

const io = new Server(server, {
    // options
});

io.sockets.emit("hi", "everyone");

io.on("connection", (socket) =>{

})


app.use(cors());
app.use(bodyParser.json())

var choices = [];

app.get('/', (req, res) => {
    res.json({msg: "isos aew"})
})

app.post('/choices/new', (req, res) => {
    choices.push(req.body)
    console.log(choices);
    res.json({msg: "succesful"});
})

server.listen(port, () => {
    console.log("listen")
})
