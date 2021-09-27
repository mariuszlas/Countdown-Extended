import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { ChatWindow } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSocket, addQuestions, addPlayer, updateGameSettings, setError } from '../../redux/actions.js';
import './style.css';

function WaitingRoom() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [isChat, setIsChat] = useState(false);

    const players = useSelector(state => state.players);
    const username = useSelector(state => state.currentPlayer);
    const roomNo = useSelector(state => state.roomNumber);
    const gameSettings = useSelector(state => state.gameSettings);
    const socket = useSelector(state => state.socket);
    const error = useSelector(state => state.error);
    const host = players.filter(player => player.username === username)[0].host;

    useEffect(() => {
        const socket = io('https://countdown-quiz-ext.herokuapp.com');
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

        socket.on('message', newMsg => setMessages(msgs => [...msgs, newMsg]));

        socket.on('join-chat', msgs => setMessages(msgs));
    }, []);

    function startGame(e) {
        e.preventDefault();
        socket.emit('start-game');
    }

    function sendMessage(e) {
        e.preventDefault();
        const msg = e.target.msg.value;
        if (msg !== '') {
            socket.emit('message', { username, msg, roomNo });
            setMessages(msgs => [...msgs, { username, msg, roomNo }]);
        }
        e.target.reset();
    }

    function joinChat(e) {
        e.preventDefault();
        socket.emit('join-chat', { username, roomNo });
        setIsChat(true);
    }

    function closeChat(e) {
        e.preventDefault();
        setIsChat(false);
    }

    const renderPlayers = () => players.map(
        (player, idx) => <p className="p-username" key={idx}><span>{player.username}</span></p>);

    return (
        <main>
            <h2>Waiting Room</h2>
            <p role="instructions">Share the room number with your friends so they can join this game!</p>
            <p role="instructions">You can have a maximum of six players in total.</p>
            { error
                ? <p role="alert">{error}</p>
                : <><div id="main-content">
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <p role="room">The room number is: <span id="room-no">{roomNo}</span></p>
                        <p role="room">Players in room:</p>
                        <div>{renderPlayers()}</div>

                        { host ?
                            <button onClick={startGame} className="button">Start Game</button>
                            : <p role="guest-instructions">Wait until the host starts the quiz</p>
                        }
                    </div>
                    { isChat ? <ChatWindow messages={messages} sendMessage={sendMessage} username={username} closeChat={closeChat}/> : null }
                    </div>
                <div>
                    { isChat ? null : <button onClick={joinChat} className="button"><i className="bi bi-chat-dots"></i></button> }                </div>
                </>
        }
        </main>
    );
}

export default WaitingRoom;
