import React from 'react';
import { useSelector } from 'react-redux';

const ScoreList = () => {
    const players = useSelector(state => state.players);
    const playersByScore = [...players].sort(compareScore).reverse();

    function compareScore(a, b) {
        let comparison = 0;

        if (a.totalScore > b.totalScore) {
            comparison = 1;
        } else if (a.totalScore < b.totalScore) {
            comparison = -1;
        }

        return comparison;
    }

    return (
        <>
            {playersByScore.map(player => (
                <table key={player.username}>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td>{player.username}</td>
                        <td>{player.totalScore}</td>
                    </tr>
                </table>
            ))}
        </>
    );
};

export default ScoreList;
