import {
    ADD_PLAYER,
    ADD_QUESTIONS,
    CURRENT_PLAYER,
    UPDATE_GAME_SETTINGS,
    UPDATE_ROOM_NUMBER,
    UPDATE_SOCKET,
    SET_ERROR
} from './constants';

/**
 * @property players - array of 'player' objects with `username`, `isReady` and `totalScore` properties.
 * @property gameSettings - object with `difficulty` and `category` properties.
 * @property questions - array of questions as modeled in the Open Trivia API.
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
            return { ...state, players: [...state.players, action.payload] };
        case UPDATE_ROOM_NUMBER:
            return { ...state, roomNumber: action.payload };
        case UPDATE_GAME_SETTINGS:
            return { ...state, gameSettings: action.payload };
        case ADD_QUESTIONS:
            return { ...state, questions: action.payload };
        case CURRENT_PLAYER:
            return { ...state, currentPlayer: action.payload };
        case SET_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default gameReducer;
