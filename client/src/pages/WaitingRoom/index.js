import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const url = 'http://localhost:5001';

function WaitingRoom() {
    const [socket, setSocket] = useState();
    const [players, setPlayers] = useState();
    const [roomNo, setRoomNo] = useState();
    const [questions, setQuestions] = useState();

    useEffect(() => {
        // connect the host of the game to the websocket
        const socket = io(url);

        // ??? Add socket to the redux store ???

        socket.on('welcome-message', msg => console.log(msg));

        // get the game settings from the store
        const gameSettings = {
            host: false,
            roomNo: 543154861,
            category: 'all',
            difficulty: 'easy',
            username: 'jon'
        };
        // if host 'true', generate a random room number
        // send request to add player to an existing room or create a new room
        socket.emit('add-player', gameSettings);

        // get the room number allocated by the server
        socket.on('joined-room', gameData => {
            setRoomNo(gameData);

            // add room no to redux store
        });

        async function getQuestions() {
            const data = await fetch(
                'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'
            );
            const q = await data.json();
            setQuestions(q);
            // add questions to the redux store
        }
        getQuestions();

        // listen for message with the current players in the room
        socket.on('players-in-room', players => setPlayers(players));

        // listen for an event to start the game
        socket.on('start-game', questions => {
            console.log('start game', questions);
            // redirect to the game page
        });

        setSocket(socket);
    }, []);

    function handleReady() {
        // socket.emit('player-ready', username)
    }

    function startGame(e) {
        e.preventDefault();
        socket.emit('send-questions', { questions: questions, roomNo: roomNo });
    }

    return (
        <>
            <h2>Waiting room</h2>
            <p>Your room number is: {roomNo}</p>
            <button onClick={e => startGame(e)}>Start Game</button>
            <p>Players in room:</p>
            <p>{players} </p>
        </>
    );
}

export default WaitingRoom;
