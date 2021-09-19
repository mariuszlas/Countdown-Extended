const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    console.log('Websocket connection initialised');

    socket.on('disconnection', socket => {
        console.log('Websocket disconnected');
    });
});

module.exports = httpServer;
