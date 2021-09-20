import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSocket, addQuestions, addPlayer } from '../../redux/actions.js';

const url = 'http://localhost:5001';

function WaitingRoom() {

    const dispatch = useDispatch();
    const history = useHistory();

    const players = useSelector(state => state.players);
    const username = useSelector(state => state.currentPlayer);
    const roomNo = useSelector(state => state.roomNumber);
    const gameSettings = useSelector(state => state.gameSettings);
    const questions = useSelector(state => state.questions);
    const socket = useSelector(state => state.socket);

    useEffect(() => {
        // connect the host of the game to the websocket
        const socket = io(url);
        socket.on('welcome-message', msg => console.log(msg));

        // Add socket to the redux store
        dispatch(updateSocket(socket));

        // send request to add player to the room
        socket.emit('add-player', { username: username, roomNo: roomNo, host: players[0].host});

        // add the player that has just joined the room
        socket.on('new-player-in-room', player => {
            if (player.username !== username) {
                dispatch(addPlayer(player.username, roomNo, false));
            }
        });

        // add players that are already in the room (used only by the non-host clients)
        socket.on('players-in-room', players => {
            players.forEach(player => {
                dispatch(addPlayer(player.username, player.roomNo, player.host));
            })
        })

        // TO DO
        // send the gamesettings (difficulty) to other players
        //

        // listen for an event to start the game
        socket.on('get-questions', questions => {
            // add questions to the store
            console.log('Questions', questions);
            // redirect to the game page
        });

        socket.on('start-game', () => {
            console.log('start game')
            //history.push('/game-results')
        })
    }, []);

    function startGame(e) {
        e.preventDefault();
        addQuestions(dispatch, gameSettings.category, gameSettings.difficulty);
        socket.emit('send-questions-to-players', { questions: questions, roomNo: roomNo });
    }

    const renderPlayers = () => players.map((player, idx) => <p key={idx}>{player.username}</p>)

    return (
        <>
            <h2>Waiting Room</h2>
            <p role="instructions">Share the room number with your friends so
                that they can answer the same set of questions at the same time
            </p>
            <p>The room number is: {roomNo}</p>
            <p>Players in room:</p>
            <div>{renderPlayers()}</div>

            {/* TO DO
                Do not render the START GAME button in the player is not the host
            */}
            <button onClick={startGame}>Start Game</button>
        </>
    );
}

export default WaitingRoom;
