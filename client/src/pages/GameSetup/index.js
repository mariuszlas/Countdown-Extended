import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { getQuestions } from '../../actions';

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

    console.log(categories);

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const category = e.target.category.value;
        const difficulty = e.target.difficulty.value;
        console.log(e.target.category.value);
        // send the username and game settings (diffcullty, category, etc.)
        // to the redux store

        dispatch(getQuestions());
        // history.push('/quiz-page');
    }

    return (
        <>
        {/*Navbar*/}
        <p role="game-instructions"></p>
        <form role="game-setup" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="username"></label>
            <input type="text" id="username" required/>

            <label htmlFor="category"></label>
            <select id="category" required>
                <option value="" disabled selected hidden>Select Category</option>
                {categories}
            </select>

            <label htmlFor="difficulty"></label>
            <select id="difficulty" required>
                <option value="" disabled selected hidden>Choose Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <label htmlFor="submit"></label>
            <input id="submit" type="submit"/>
        </form>
        </>
    );
}

export default GameSetup;
