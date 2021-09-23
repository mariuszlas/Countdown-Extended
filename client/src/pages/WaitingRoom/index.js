import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSocket, addQuestions, addPlayer, updateGameSettings, setError } from '../../redux/actions.js';

function WaitingRoom() {

    const dispatch = useDispatch();
    const history = useHistory();

    const players = useSelector(state => state.players);
    const username = useSelector(state => state.currentPlayer);
    const roomNo = useSelector(state => state.roomNumber);
    const gameSettings = useSelector(state => state.gameSettings);
    const socket = useSelector(state => state.socket);
    const error = useSelector(state => state.error);
    const host = players.filter(player => player.username === username)[0].host;

    useEffect(() => {
        const socket = io('https://countdown-quiz-api.herokuapp.com');
        dispatch(updateSocket(socket));

        // send request to add player to the room
        socket.emit('add-player', { username: username,
                                    roomNo: roomNo,
                                    host: players[0].host,
                                    gameSettings: gameSettings
                                });

        socket.on('entry-denied', err => dispatch(setError(err)));

        socket.on('questions', questions => {
            questions.length === 0
            ? dispatch(setError('There are no questions available for this category and difficulty. Try different ones'))
            : dispatch(addQuestions(questions));
        });

        // add the player that has just joined the room
        socket.on('new-player-in-room', player => {
            if (player.username !== username) {
                dispatch(addPlayer(player.username, roomNo, false));
            }
        });

        // add players that are already in the room (used only by the non-host clients)
        socket.on('players-in-room', ({ players, gameSettings }) => {
            dispatch(updateGameSettings(gameSettings.category, gameSettings.difficulty, gameSettings.categoryName));
            players.forEach(player => {
                dispatch(addPlayer(player.username, player.roomNo, player.host));
            })
        });

        socket.on('start-game', () => history.replace('/quiz-page'));
    }, []);

    function startGame(e) {
        e.preventDefault();
        socket.emit('start-game');
    }

    const renderPlayers = () => players.map(
        (player, idx) => <p className="p-username" key={idx}><span>{player.username}</span></p>);

    return (
        <main>
            <h2>Waiting Room</h2>
            { error
                ? <p role="alert">{error}</p>
                : <div>
                    <p role="instructions">Share the room number with your friends so they can join this game!</p>
                    <p role="instructions">You can have a maximum of four players in total.</p>
                    <p role="room">The room number is: <span id="room-no">{roomNo}</span></p>
                    <p role="room">Players in room:</p>
                    <div>{renderPlayers()}</div>

                    { host ?
                        <button onClick={startGame} className="button">Start Game</button>
                        : <p role="guest-instructions">Wait until the host starts the quiz</p>
                    }
                </div>
        }
        </main>
    );
}

export default WaitingRoom;
