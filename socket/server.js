const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

//--------------- CREATE HTTP SERVER AND MOUNT THE WEBSOCKET -----------//
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let socketsConnected = [];

io.on('connection', socket => {
    console.log('Websocket connected');

    // get total number of client connections
    const participantCount = io.engine.clientsCount;
    console.log('clients connected:', participantCount);

    // send event only to the newly connected client
    socket.emit('welcome-message', 'You are the new client!');

    // send event to all other clients (except the newly connected one)
    socket.broadcast.emit('welcome-message', `A new client has joined the room`);

    // send event to all clients
    io.emit(
        'welcome-message',
        `There are ${participantCount} clients connected now!`
    );

    socket.on('add-player', gameInfo => {

        const roomNo = parseInt(gameInfo.roomNo);

        // add socket to an array of connected sockets
        const player = {
            socketId: socket.id,
            roomNo: roomNo,
            username: gameInfo.username,
            host: gameInfo.host,
            score: 0
        };
        socketsConnected.push(player);

        // join the new room
        socket.join(roomNo);

        console.log('sockets in list', socketsConnected.length);

        const currentPlayers = socketsConnected.filter(
            socket => parseInt(socket.roomNo) === roomNo && socket.username !== gameInfo.username);

        // send players that are already in the room to the player that has just join in
        socket.emit('players-in-room', currentPlayers);
        // send info about new player to all other players
        socket.to(roomNo).emit('new-player-in-room', player);

        socket.on('send-questions-to-players', data => {
            socket.in(roomNo).emit('get-questions', data.questions);
            io.in(roomNo).emit('start-game');
        });

        // send the results of this player to all other players
        socket.on('sendPlayerScore', results => {
            socket.to(roomNo).emit('getAllScores', results);
            console.log('outside');
        });

        socket.on('disconnect', socket => {
            // remove socket from the list of sockets connected
            const socketToRemove = socketsConnected.filter(s => s.id === socket.id);
            socketsConnected.splice(indexOf(socketToRemove, indexOf(socketToRemove)))
            console.log('Websocket disconnected');
        });
    });
});

module.exports = httpServer;
