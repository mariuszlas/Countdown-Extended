import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSocket, addQuestions, addPlayer, updateGameSettings } from '../../redux/actions.js';

const url = 'http://localhost:5001';

function WaitingRoom() {

    const dispatch = useDispatch();
    const history = useHistory();

    const players = useSelector(state => state.players);
    const username = useSelector(state => state.currentPlayer);
    const roomNo = useSelector(state => state.roomNumber);
    const gameSettings = useSelector(state => state.gameSettings);
    const socket = useSelector(state => state.socket);
    const host = players.filter(player => player.username === username)[0].host;

    useEffect(() => {
        // connect the host of the game to the websocket
        const socket = io(url);

        // Add socket to the redux store
        dispatch(updateSocket(socket));

        // send request to add player to the room
        socket.emit('add-player', { username: username,
                                    roomNo: roomNo,
                                    host: players[0].host,
                                    gameSettings: gameSettings
                                });

        socket.on('questions', questions => dispatch(addQuestions(questions)));

        // add the player that has just joined the room
        socket.on('new-player-in-room', player => {
            if (player.username !== username) {
                dispatch(addPlayer(player.username, roomNo, false));
            }
        });

        // add players that are already in the room (used only by the non-host clients)
        socket.on('players-in-room', ({ players, gameSettings }) => {
            dispatch(updateGameSettings(gameSettings.category, gameSettings.difficulty));
            players.forEach(player => {
                dispatch(addPlayer(player.username, player.roomNo, player.host));
            })
        });

        // TO DO ???
        // send the gamesettings (difficulty) to other players

        socket.on('start-game', () => history.push('/quiz-page'));
    }, []);

    function startGame(e) {
        e.preventDefault();
        socket.emit('start-game');
    }

    const renderPlayers = () => players.map(
        (player, idx) => <p className="p-username" key={idx}>{player.username}</p>);

    return (
        <>
            <h2>Waiting room</h2>
            <p>Your room number is: {roomNo}</p>
            <button onClick={e => startGame(e)} className="button">Start Game</button>
            <p>Players in room:</p>
            <div>{renderPlayers()}</div>

            { host ?
                <button onClick={startGame}>Start Game</button>
                : <p>Wait until the host starts the quiz</p>
            }
        </>
    );
}

export default WaitingRoom;
