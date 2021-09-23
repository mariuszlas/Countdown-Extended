import {
    ADD_PLAYER,
    ADD_QUESTIONS,
    CURRENT_PLAYER,
    SET_ERROR,
    UPDATE_GAME_SETTINGS,
    UPDATE_RESULTS,
    UPDATE_SCORE,
    UPDATE_SOCKET
} from './constants';

export const updateSocket = socket => {
    return { type: UPDATE_SOCKET, payload: socket };
};

/**
 * @param {string} username
 * @param {number} room random number generated in NewGame page.
 * @returns action to add a new player to existing list.
 */
export const addPlayer = (username, room, host) => {
    const player = {
        username,
        host: host,
        totalScore: 0
    };

    return { type: ADD_PLAYER, payload: { room, player } };
};

export const updateGameSettings = (category, difficulty, categoryName) => {
    return { type: UPDATE_GAME_SETTINGS, payload: { category, difficulty, categoryName } };
};

/**
 * Add questions fetched from the Open Trivia API to state.
 * @param {string} category
 * @param {string} difficulty
 */

export const addQuestions = questions => {
    return { type: ADD_QUESTIONS, payload: questions };
};

export const updateScore = score => {
    return { type: UPDATE_SCORE, payload: score };
};

export const addCurrentPlayer = username => {
    return { type: CURRENT_PLAYER, payload: username };
};

export const setError = err => {
    return { type: SET_ERROR, payload: err };
};

export const updatePlayerResults = scores => {
    return { type: UPDATE_RESULTS, payload: scores };
};

export const cleanString = str => {
    const cleanStr = str
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&Eacute;/g, 'E')
        .replace(/&eacute;/g, 'e')
        .replace(/&amp;/g, ' & ')
        .replace(/&Uuml;/g, 'U')
        .replace(/&pi;/g, 'pi')
        .replace(/&shy;/g, '')
        .replace(/&divide;/g, '/')
        .replace(/&ntilde;/g, 'n')
        .replace(/&Aacute;/g, 'A')
        .replace(/&aacute;/g, 'a')
        .replace(/&Egrave;/g, 'E')
        .replace(/&egrave;/g, 'e')
    return cleanStr
};

export const firstCharUpperCase = (str) => {
    const l = str.length
    let Str = new Array(l);
    for (let i = 0; i < l; i++) {
        Str[i] = str[i];
    }
    
    Str[0] = Str[0].toUpperCase();

    return Str.join('')
}

export function calcDuration(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 45
        case 'medium':
            return 30
        case 'hard':
            return 15
        default:
            console.error('Difficulty is missing');
    }
}

export function calcScoreIncrement(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 1
        case 'medium':
            return 2
        case 'hard':
            return 3
        default:
            console.error('Difficulty is missing');
    }
}
