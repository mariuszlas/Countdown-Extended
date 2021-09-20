import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSocket } from '../../redux/actions.js';

const url = 'http://localhost:5001';

function WaitingRoom() {

    const dispatch = useDispatch();
    const history = useHistory();

    const players = useSelector(state => state.players);
    const username = useSelector(state => state.currentPlayer);
    const roomNo = useSelector(state => state.roomNumber);

    useEffect(() => {
        // connect the host of the game to the websocket
        const socket = io(url);
        socket.on('welcome-message', msg => console.log(msg));

        // Add socket to the redux store
        dispatch(updateSocket(socket));

        // send request to add player to an existing room or create a new room
        socket.emit('add-player', { username: username, roomNo: roomNo });

        // get the room number allocated by the server
        socket.on('joined-room', msg => console.log(msg));

        // listen for message with the current players in the room
        socket.on('new-player-in-room', player => {
            dispatch(addPlayer(player.username, roomNo, false))
        });

        // listen for an event to start the game
        socket.on('start-game', questions => {
            console.log('start game', questions);
            // redirect to the game page
        });
    }, []);

    // function handleReady() {
        // socket.emit('player-ready', username)
    // }

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
            <p> </p>
        </>
    );
}

export default WaitingRoom;
