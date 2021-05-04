const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const RpsGame = require('./rps');

const app = express();

const clientPath = `${__dirname}/../client`
console.log(`Serving static from: ${clientPath}`)

app.use(express.static(clientPath))

const server = http.createServer(app)

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock) => {

    if(waitingPlayer){
        new RpsGame(waitingPlayer, sock);

        waitingPlayer = null;
    }else{
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waiting for an opponent');
    }

    sock.on('usermessage', (text) => {
        io.emit('usermessage', text);
    });

    sock.on('message', (text) => {
        io.emit('message', text);
    });

    sock.on('score', (score) => {
        io.emit('score', score);
    });
});

server.on('error', (err) => {
    console.error(`Server Error: ${err}`);
});

server.listen(80, null, () => {
    console.log('Rock Paper Scissors has begun on port 8080!');
});
