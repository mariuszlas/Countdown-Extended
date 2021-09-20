import {
    ADD_PLAYER,
    ADD_QUESTIONS,
    UPDATE_GAME_SETTINGS,
    UPDATE_ROOM_NUMBER,
    UPDATE_SOCKET,
    SET_ERROR,
    UPDATE_SCORE
} from './constants';

/**
 * @property players - array of 'player' objects with `username`, `host` and `totalScore` properties.
 * @property gameSettings - object with `difficulty` and `category` properties.
 * @property questions - array of questions as modeled in the Open Trivia API, with the addition of a `isCorrect` property.
 */
const initialState = {
    socket: null,
    players: [],
    roomNumber: null,
    gameSettings: {},
    questions: [],
    currentPlayer: '',
    questionNum: 0
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SOCKET:
            return { ...state, socket: action.payload };
        case ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.payload.player],
                roomNumber: action.payload.room,
                currentPlayer: action.payload.player.username
            };
        case UPDATE_GAME_SETTINGS:
            return { ...state, gameSettings: action.payload };
        case ADD_QUESTIONS:
            return { ...state, questions: action.payload };
<<<<<<< HEAD
        case CURRENT_PLAYER:
            return { ...state, currentPlayer: action.payload };
        case SET_ERROR:
            return {...state, error: action.payload};
=======
        case UPDATE_SCORE:
            return {
                ...state,
                players: state.players.map(player =>
                    player.username === state.currentPlayer
                        ? { ...player, totalScore: (totalScore += action.payload) }
                        : player
                )
            };
>>>>>>> 1610215821f49a560a48d62fd6b5c4b15ee2195b
        default:
            return state;
    }
};

export default gameReducer;
