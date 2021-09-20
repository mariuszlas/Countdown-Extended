import {
    ADD_PLAYER,
    ADD_QUESTIONS,
    UPDATE_GAME_SETTINGS,
    UPDATE_SCORE,
    UPDATE_SOCKET,
    CURRENT_PLAYER
} from './constants';

export const updateSocket = socket => {
    return { type: UPDATE_SOCKET, payload: socket };
};

/**
 * @param {string} username
 * @param {number} room random number generated in NewGame page.
 * @returns action to add a new player to existing list.
 */
export const addPlayer = (username, room, players) => {
    const player = {
        username,
        host: !players.length ? true : false,
        totalScore: 0
    };

    return { type: ADD_PLAYER, payload: { room, player } };
};

export const updateGameSettings = (category, difficulty) => {
    return { type: UPDATE_GAME_SETTINGS, payload: { category, difficulty } };
};

/**
 * Add questions fetched from the Open Trivia API to state.
 * @param {string} category
 * @param {string} difficulty
 */
export const addQuestions = (category, difficulty) => async dispatch => {
    try {
        const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
        const { results } = await axios.get(url);
        dispatch({ type: ADD_QUESTIONS, payload: results });
    } catch (error) {
        console.error('Error fetching questions ', error);
    }
};

export const updateScore = score => {
    return { type: UPDATE_SCORE, payload: score };
};

export const setCurrentPlayer = username => {
    return { type: CURRENT_PLAYER, payload: username };
}
