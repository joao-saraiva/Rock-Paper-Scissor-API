const express = require("express");
const app = express();
const cors = require('cors')
const http = require('http');

const { Server } = require("socket.io");
const port = 3000;
const bodyParser = require('body-parser');
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json())

let playesOptions = [];

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) =>{
    socket.on('selectedOption', (data) =>{
        let user = {id: socket.id};
        if(playesOptions.filter(e => e.id == socket.id).length > 0){
            socket.emit('alreadyChoosed', {message: 'You Already Have Choosed an Option'});
        }else{
            let play = {...data, ...user}
            playesOptions.push(play);
            io.emit('receivedOption', play);

            if(playesOptions.length == 2){
                let result = decideWinner(playesOptions);
                io.emit('result', result);
                playesOptions = [];
            }
        }
    })
})

function decideWinner(playersOptions){
    let playerOneOption = playersOptions[0].option
    let playerTwoOption = playersOptions[1].option

    if( ( playerOneOption.toLowerCase() == 'paper' || playerTwoOption.toLowerCase() == 'paper' ) && ( playerOneOption.toLowerCase() == 'rock' || playerTwoOption.toLowerCase() == 'rock' ) ){
        let winner = playerOneOption.toLowerCase() == 'paper'  ? playersOptions[0].id : playersOptions[1].id;
        return {
            winnerId: winner,
            result: `Winner is: ${winner}`
        }
    }else if( ( playerOneOption.toLowerCase() == 'rock' || playerTwoOption.toLowerCase() == 'rock' ) && ( playerOneOption.toLowerCase() == 'scissors' || playerTwoOption.toLowerCase() == 'scissors' ) ){
        let winner = playerOneOption.toLowerCase() == 'rock'  ? playersOptions[0].id : playersOptions[1].id;
        return {
            winnerId: winner,
            result: `Winner is: ${winner}`
        }
    }else if( ( playerOneOption.toLowerCase() == 'scissors' || playerTwoOption.toLowerCase() == 'scissors' ) && ( playerOneOption.toLowerCase() == 'paper' || playerTwoOption.toLowerCase() == 'paper' ) ){
        let winner = playerOneOption.toLowerCase() == 'scissors'  ? playersOptions[0].id : playersOptions[1].id;
        return {
            winnerId: winner,
            result: `Winner is: ${winner}`
        }
    }else{
        return {
            result: 'draw'
        }
    }
}

server.listen(port, () => {
    console.log("listen")
})
