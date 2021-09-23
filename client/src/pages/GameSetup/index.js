import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateGameSettings, addPlayer, addCurrentPlayer } from '../../redux/actions.js';
import '../index.css'

function GameSetup() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [categories, setCategories] = useState();

    useEffect(() => {
        async function getCategories() {
            try {
                const { data } = await axios.get('https://opentdb.com/api_category.php');
                const options = data.trivia_categories.map(
                    category => <option key={category.id} value={category.id}>{category.name}</option>
                );
                setCategories(options);
            } catch (err) {
                console.error(err);
            }
        }
        getCategories();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const category = e.target.category.value;
        const difficulty = e.target.difficulty.value;

        const categoryName = categories.filter(cat => cat.key === category)[0].props.children
        const room = Math.round(Math.random() * 1000000000);

        const isValid = await checkUsername(username);

        if (!isValid) {
            alert(`'${username}' is already taken. Try another one.`);
            e.target.username.value = '';
            return;
        }

        dispatch(updateGameSettings(category, difficulty, categoryName));
        dispatch(addPlayer(username, room, true));
        dispatch(addCurrentPlayer(username));
        history.replace('/waiting-room')
    }

    async function checkUsername(username) {
        try {
            await axios.post('https://countdown-quiz-api.herokuapp.com/usernames', { name: username });
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <>
        <main>
            <section>
                <h1>Game Instructions</h1>
                <p role="game-instructions">The quiz is composed of 10 questions.</p>
                <p role="game-instructions">You can select the topic and difficulty of the questions below. </p>
                <p role="game-instructions">Each question has four different answers, only one of them is correct. </p>
                <p role="game-instructions">You will have 15 seconds to answer each question.</p>
                <p role="game-instructions">Score Multipliers: Medium Difficulty = Score x2, Hard Difficulty = Score x3</p>
            </section>
            <form role="game-setup" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="username"></label>
                <input type="text" id="username" placeholder='username' className="textbox" required/>

                <div id="dropdowns">
                    <label htmlFor="category"></label>
                    <select id="category" defaultValue="" className="dropdown" required>
                        <option value="" disabled  hidden>Select Category</option>
                        {categories}
                    </select>

                    <label htmlFor="difficulty"></label>
                    <select id="difficulty" defaultValue="" className="dropdown" required>
                        <option value="" disabled hidden>Choose Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <br/>
                <label htmlFor="submit"></label>
                <input id="submit" type="submit" className="button" value="Join the Waiting Room"/>
            </form>
            </main>
        </>
    );
}

export default GameSetup;
