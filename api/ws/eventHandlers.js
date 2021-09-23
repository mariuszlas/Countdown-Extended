const { fetchQuestions } = require('./helpers.js');

async function updateRooms(rooms, roomNo, gameInfo) {
    const checkRoom = rooms.filter(room => parseInt(room.roomNo) === roomNo);

    if (checkRoom.length === 0){
        const questionsData = await fetchQuestions(gameInfo.gameSettings);
        const room = {
            roomNo: roomNo,
            questions: questionsData,
            gameSettings: gameInfo.gameSettings,
            scores: []
        };
        rooms.push(room);
    };
    return rooms;
};

function updatePlayers(socket, roomNo, gameInfo) {
    // send data about new player to all other players in the room
    const player = {
        socketId: socket.id,
        roomNo: roomNo,
        username: gameInfo.username,
        host: gameInfo.host
    };

    socket.to(roomNo).emit('new-player-in-room', player);
    return player;
};

function sendQuestions(socket, roomData, roomNo) {
    // send the correct questions to the player that has just joined the room
    const questions = roomData[0].questions;
    socket.emit('questions', questions);
}

function sendPlayers(socket, roomData, players, roomNo, gameInfo) {
    // send data about players that are already in the room to the player that has just joined in
    const playersInRoom = players.filter(
        socket => parseInt(socket.roomNo) === roomNo && socket.username !== gameInfo.username);

    socket.emit('players-in-room', {
        players: playersInRoom,
        gameSettings: roomData[0].gameSettings
    });
}

module.exports = { updateRooms, updatePlayers, sendQuestions, sendPlayers };
