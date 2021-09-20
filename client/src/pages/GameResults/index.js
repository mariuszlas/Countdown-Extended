import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GameResults = () => {
    const [scoreList, setScoreList] = useState([]);

    const socket = useSelector(state => state.socket);
    const players = useSelector(state => state.players);
    const currentPlayer = useSelector(state => state.currentPlayer);

    const { totalScore, username } = players.find(player => player.username === currentPlayer);

    const sendPlayerScore = () => {
        socket.emit('sendPlayerScore', { username, totalScore });
        setScoreList(previousScores => [...previousScores, { username, totalScore }]);
    };

    const getRoomScores = () => {
        socket.on('getAllScores', scores => {
            setScoreList(previousScores => [...previousScores, scores]);
        });
    };

    useEffect(() => {
        sendPlayerScore();
        getRoomScores();
    }, [socket]);

    return (
        <>
            <h1>{`Congratulations ${username}`}</h1>
            <h2>{`Your score is ${totalScore}`}</h2>
            <h3>Room Scores</h3>
            {scoreList.map(player => (
                <div>
                    <p>{player.username}</p>
                    <p>{player.totalScore}</p>
                </div>
            ))}
            <div className="actions">
                <Link to="/">Homepage</Link>
                <Link to="/all-results">View All Scores</Link>
                <Link to="/answers">View Correct Answers</Link>
            </div>
        </>
    );
};

export default GameResults;
