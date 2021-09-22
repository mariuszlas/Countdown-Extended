import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePlayerResults } from '../../redux/actions';
import { SET_ERROR } from '../../redux/constants';
import './style.css';

const GameResults = () => {
    const dispatch = useDispatch();

    const socket = useSelector(state => state.socket);
    const players = useSelector(state => state.players);
    const currentPlayer = useSelector(state => state.currentPlayer);
    const roomNumber = useSelector(state => state.roomNumber);
    const results = useSelector(state => state.results)
    const totalScore = players.filter(player => player.username === currentPlayer)[0].totalScore;

    const sendPlayerScore = async () => {
        socket.emit('sendPlayerScore', { username: currentPlayer, totalScore, roomNumber });

        try {
            await axios.post('https://countdown-quiz-api.herokuapp.com/score', { username: currentPlayer, score: totalScore });
        } catch (error) {
            console.error(`Error adding score to server `, error.message);
            dispatch({ type: SET_ERROR, payload: error.message });
        }
    };

    const getRoomScores = () => {
        socket.on('getAllScores', scores => {
            dispatch(updatePlayerResults(scores))
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
                {results.map((player, idx) => (
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
