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
                const { data } = await axios.get('https://countdown-quiz-api.herokuapp.com/score');
                setAllScores(data);
            } catch (error) {
                console.error(`Error getting scores from server `, error.message);
                dispatch({ type: SET_ERROR, payload: error.message });
            }
        };

        getScores();
    }, []);

    console.log('playersByScore ', allScores);

    function compareScore(a, b) {
        let comparison = 0;

        if (a.score > b.score) {
            comparison = 1;
        } else if (a.score < b.score) {
            comparison = -1;
        }

        return comparison;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {playersByScore.map((player, index) => (
                    <tr key={index}>
                        <td>{player.username}</td>
                        <td>{player.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AllResults;
