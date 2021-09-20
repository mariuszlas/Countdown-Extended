import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { updateGameSettings, addPlayer, addCurrentPlayer } from '../../redux/actions.js';

function GameSetup() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [categories, setCategories] = useState();

    useEffect(() => {
        async function getCategories() {
            const result = await fetch('https://opentdb.com/api_category.php');
            const categories = await result.json();
            const options = categories.trivia_categories.map(
                category => <option key={category.id} value={category.id}>{category.name}</option>
            );
            setCategories(options);
        }
        getCategories();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const category = e.target.category.value;
        const difficulty = e.target.difficulty.value;
        const room = Math.round(Math.random() * 1000000000);

        dispatch(updateGameSettings(category, difficulty));
        dispatch(addPlayer(username, room, true));
        dispatch(addCurrentPlayer(username));
        history.push('/waiting-room')
    }

    return (
        <>
        <nav>
            {/*Home button*/}
        </nav>
        <main>
            <p role="game-instructions">The quiz is composed of 10 questions. You can select the topic
                and difficulty of the questions below. Each question has four different answers,
                only one of them is correct. You will have 15 seconds to answers each question.
            </p>
            <form role="game-setup" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="username"></label>
                <input type="text" id="username" placeholder='username' required/>

                <div id="dropdowns">
                    <label htmlFor="category"></label>
                    <select id="category" defaultValue="" required>
                        <option value="" disabled  hidden>Select Category</option>
                        {categories}
                    </select>

                    <label htmlFor="difficulty"></label>
                    <select id="difficulty" defaultValue="" required>
                        <option value="" disabled hidden>Choose Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <label htmlFor="submit"></label>
                <input id="submit" type="submit" value="Join the Waiting Room"/>
            </form>
            </main>
        </>
    );
}

export default GameSetup;
