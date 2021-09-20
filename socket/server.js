const { Server } = require('socket.io');
const express = require('express');
const http = require('http');
const { getQuestions } = require('./requests.js');

//--------------- CREATE HTTP SERVER AND MOUNT WEBSOCKET -----------//
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let rooms = [];
let socketsConnected = [];

//---------------- HANDLE WEBSOCKET TRAFFIC -------------------------//
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

    //------------------ HANDLE ROOMS --------------------------------//
    socket.on('add-player', settings => {
        // let roomNo;
        // if (settings.host === true) {
        //     roomNo = rooms.length + 1;
        //     const questions = await getQuestions(settings);
        //
        //     // add room to the room array
        //     rooms.push({
        //         roomNo: roomNo,
        //         settings: settings,
        //         questions: questions
        //     });
        // } else {
        //     roomNo = settings.roomNo;
        // }
        //
        // console.log(rooms);
        // console.log(socketsConnected);

        //get all sockets connected to a given room
        // const socketsInRoom = Array.from(io.sockets.adapter.rooms.get(roomNo));
        //console.log(socketsInRoom);

        // add socket to an array of connected sockets
        socketsConnected.push({
            socketId: socket.id,
            roomNo: settings.roomNo,
            username: settings.username
        });
        console.log(socketsConnected);
        console.log(socketsConnected.length);

        // join the new room
        socket.join(settings.roomNo);

        // send the room numer and questions to the client
        // const room = rooms.filter(room => room.roomNo === roomNo);
        socket.emit('joined-room', settings.roomNo);

        // get all players in current room and send them to all clients
        const socketsInRoom = socketsConnected.filter(
            socket => socket.roomNo === settings.roomNo
        );
        const players = socketsInRoom.map(socket => socket.username);
        socket.emit('players-in-room', players);

        // send questions and start-game message to the clients
        socket.on('send-questions', gameData => {
            io.to(gameData.roomNo).emit('start-game', gameData.questions);
        });

        socket.on('disconnect', socket => {
            // remove socket from the list of sockets connected
            console.log('Websocket disconnected');
        });
    });
});

module.exports = httpServer;
