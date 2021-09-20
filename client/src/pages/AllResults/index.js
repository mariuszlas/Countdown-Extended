import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_ERROR } from '../../redux/constants';

const AllResults = () => {
    const dispatch = useDispatch();

    const [allScores, setAllScores] = useState([]);
    const playersByScore = [...allScores].sort(compareScore).reverse();

    useEffect(() => {
        const getScores = async () => {
            try {
                const scores = await axios.get('http://localhost:3000/score');
                setAllScores(previous => [...previous, scores]);
            } catch (error) {
                console.error(`Error getting scores from server `, error.message);
                dispatch({ type: SET_ERROR, payload: error.message });
            }
        };

        getScores();
    }, []);

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

export default AllResults;
