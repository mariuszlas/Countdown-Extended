const { Server } = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = require('./routes/router.js');
const { updateRooms, updatePlayers, sendQuestions, sendPlayers } = require('./ws/eventHandlers.js');

//------------------- CREATE HTTP SERVER ---------------------//
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

const httpServer = http.createServer(app);

//------- MOUNT WEBSOCKET SERVER ON HTTP SERVER -------------//
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'GET', 'DELETE']
    }
});

let players = [];
let rooms = [];

// -------------- LISTEN FOR WEBSOCKET EVENTS -----------------//
io.on('connection', socket => {

    console.log('Websocket connected');

    socket.on('add-player', async gameInfo => {
        const roomNo = parseInt(gameInfo.roomNo);

        // check if room exists and if there are already 4 sockets conected, deny entry to the room
        if (io.sockets.adapter.rooms.has(roomNo) && io.sockets.adapter.rooms.get(roomNo).size > 3) {
            socket.emit('entry-denied', 'Entry denied. The maximum number of players in room was exceeded.');
            socket.disconnect();
        } else {
            socket.join(roomNo);
            rooms = await updateRooms(rooms, roomNo, gameInfo);
            const roomData = rooms.filter(room => parseInt(room.roomNo) === roomNo);

            const player = updatePlayers(socket, roomNo, gameInfo);
            players.push(player);

            sendPlayers(socket, roomData, players, roomNo, gameInfo);
            sendQuestions(socket, roomData);
        }

        socket.on('start-game', () => io.in(roomNo).emit('start-game'));

        socket.once('sendPlayerScore', results => {
            // send the results of the game to players
            const room = rooms.filter(room => parseInt(room.roomNo) === parseInt(results.roomNumber))[0];
            const idx = rooms.indexOf(room)
            rooms[idx].scores.push(results);

            socket.emit('getAllScores', [...room.scores ])
            socket.to(roomNo).emit('getAllScores', [results]);
        });

        socket.on('disconnect', socket => {
            // remove player from the list of players connected
            const playerToRemove = players.filter(player => player.id === socket.id)[0];
            const idx = players.indexOf(playerToRemove);
            players.splice(idx, idx - 1);
            console.log('Websocket disconnected');
        });
    });
});

module.exports = { httpServer, io };
