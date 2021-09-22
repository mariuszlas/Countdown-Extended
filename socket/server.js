const { Server } = require('socket.io');
const express = require('express');
const http = require('http');
const { fetchQuestions } = require('./helpers.js');

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
let questions = [];
let allScores = [];

io.on('connection', socket => {

    console.log('Websocket connected');
    const participantCount = io.engine.clientsCount;

    socket.on('add-player', async gameInfo => {

        const roomNo = parseInt(gameInfo.roomNo);

        // check if room exists and if there are 4 sockets conected deny entry to the room
        if (io.sockets.adapter.rooms.has(roomNo) && io.sockets.adapter.rooms.get(roomNo).size > 3) {
            socket.emit('entry-denied', 'Entry denied. The maximum number of players in room was exceeded.');
            socket.disconnect();
        }

        const questionsData = await fetchQuestions(gameInfo.gameSettings);

        questions.push({
            roomNo: roomNo,
            questions: questionsData,
            gameSettings: gameInfo.gameSettings,
            scores: []
        });

        // add socket to an array of connected sockets
        const player = {
            socketId: socket.id,
            roomNo: roomNo,
            username: gameInfo.username,
            host: gameInfo.host
        };
        socketsConnected.push(player);
        console.log('sockets in list', socketsConnected.length);

        // join the new room
        socket.join(roomNo);
        // send the correct questions to the newly joined clinet
        const roomData = questions.filter(q => parseInt(q.roomNo) === roomNo);
        socket.emit('questions', roomData[0].questions);

        const currentPlayers = socketsConnected.filter(
            socket => parseInt(socket.roomNo) === roomNo && socket.username !== gameInfo.username);

        // send info about players that are already in the room to the player that has just joined in
        socket.emit('players-in-room', { players: currentPlayers, gameSettings: roomData[0].gameSettings });
        // send info about new player to all other players
        socket.to(roomNo).emit('new-player-in-room', player);

        socket.on('start-game', () => io.in(roomNo).emit('start-game'));


        // send the results of this player to all other players
        socket.once('sendPlayerScore', results => {
            const q = questions.filter(q => parseInt(q.roomNo) === parseInt(results.roomNumber))[0];
            const idx = questions.indexOf(q)
            questions[idx].scores.push(results);
            socket.emit('getAllScores', [...q.scores ])
            socket.to(roomNo).emit('getAllScores', [results]);
        });

        socket.on('disconnect', socket => {
            // remove socket from the list of sockets connected
            // const socketToRemove = socketsConnected.filter(s => s.id === socket.id);
            console.log('Websocket disconnected');
        });
    });
});

module.exports = httpServer;
