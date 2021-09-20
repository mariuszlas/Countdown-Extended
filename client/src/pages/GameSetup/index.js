import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { getQuestions } from '../../actions';

function GameSetup() {

    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        // send the username and game settings (diffcullty, category, etc.)
        // to the redux store
        dispatch(getQuestions());
        history.push('/quiz-page');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="submit" />
        </form>
    );
}

export default GameSetup;
