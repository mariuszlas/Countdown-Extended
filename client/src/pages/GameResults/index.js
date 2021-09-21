import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SET_ERROR } from '../../redux/constants';
import './style.css';

const GameResults = () => {

    const [scoreList, setScoreList] = useState([])
    const dispatch = useDispatch();

    const socket = useSelector(state => state.socket);
    const players = useSelector(state => state.players);
    const currentPlayer = useSelector(state => state.currentPlayer);
    const roomNumber = useSelector(state => state.roomNumber);
    const totalScore = players.filter(player => player.username === currentPlayer)[0].totalScore;

    const sendPlayerScore = async () => {
        socket.emit('sendPlayerScore', { username: currentPlayer, totalScore, roomNumber });

        try {
            await axios.post('http://localhost:3000/score', { username: currentPlayer, score: totalScore });
        } catch (error) {
            console.error(`Error adding score to server `, error.message);
            dispatch({ type: SET_ERROR, payload: error.message });
        }
    };

    const getRoomScores = () => {
        socket.on('getAllScores', scores => {
            setScoreList(previousScores => [...previousScores, ...scores]);
        });
    };

    useEffect(() => {
        sendPlayerScore();
        getRoomScores();
    }, []);

    return (
        <main>
            <h1>{`Congratulations ${currentPlayer}`}</h1>
            <h2>{`Your score is ${totalScore}`}</h2>
            <h3>Room Scores</h3>
            <section role="results">
                {scoreList.map((player, idx) => (
                    <p className="user-results" key={idx}>
                        <span>{player.username}</span>
                        <span>{player.totalScore}</span>
                    </p>
                ))}
            </section>
            <div className="actions">
                <Link to="/">Homepage</Link>
                <Link to="/all-results">View All Scores</Link>
                <Link to="/answers">View Correct Answers</Link>
            </div>
        </main>
    );
};

export default GameResults;
