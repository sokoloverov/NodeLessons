//const express = require('express');
//const app = express();
const http = require('http');
//const server = http.createServer(app);
//const { Server } = require("socket.io");
//const require = require('yargs');
//const io = new Server(server);
const path = require('path');
const fs = require('fs');
const socket = require('socket.io');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
});

const io = socket(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', client => {
    console.log('a user connected', client.id);

    client.on('client-msg', (data) => {
        console.log(data);
        const payload = {
            message: data.message.split('').reverse().join(''),
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});