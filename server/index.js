const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    socket.emit('welcome user', "Welcome!");

    socket.broadcast.emit('user join', "New user joined the chat!");

    socket.on('send message', (message) => {
        io.emit("check message", message);
    });

    socket.on('send location', (location, callback) => {
        console.log(location);
        socket.broadcast.emit('share location', `https://maps.google.com?q=${location.longitude},${location.latitude}`);
        callback("Location shared successfully!");
    });
});

server.listen(PORT, () => {
    console.log('Listening on PORT ', PORT);
});