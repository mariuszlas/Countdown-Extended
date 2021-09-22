import {
    ADD_PLAYER,
    ADD_QUESTIONS,
    CURRENT_PLAYER,
    SET_ERROR,
    UPDATE_GAME_SETTINGS,
    UPDATE_SCORE,
    UPDATE_SOCKET,
    RESET_SCORE,
    UPDATE_RESULTS
} from './constants';

/**
 * @property players - array of 'player' objects with `username`, `host` and `totalScore` properties.
 * @property gameSettings - object with `difficulty`, `category` and `categoryName` properties.
 * @property questions - array of questions as modeled in the Open Trivia API, with the addition of a `isCorrect` property.
 */
const initialState = {
    socket: null,
    players: [],
    roomNumber: null,
    gameSettings: {},
    questions: [],
    currentPlayer: '',
    error: null,
    results: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SOCKET:
            return { ...state, socket: action.payload };
        case ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.payload.player],
                roomNumber: action.payload.room
            };
        case UPDATE_GAME_SETTINGS:
            return { ...state, gameSettings: action.payload };
        case ADD_QUESTIONS:
            return { ...state, questions: action.payload };
        case CURRENT_PLAYER:
            return { ...state, currentPlayer: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case RESET_SCORE:
            return {
                ...state,
                players: state.players.map(player =>
                    player.username === state.currentPlayer
                        ? { ...player, totalScore: (player.totalScore = action.payload) }
                        : player
                )
            };
        case UPDATE_SCORE:
            return {
                ...state,
                players: state.players.map(player =>
                    player.username === state.currentPlayer
                        ? { ...player, totalScore: (player.totalScore += action.payload) }
                        : player
                )
            };
        case UPDATE_RESULTS:
            const updatedResults = [...state.results, ...action.payload]
            return { ...state, results: [...new Set(updatedResults)]  };
        default:
            return state;
    }
};

export default gameReducer;
