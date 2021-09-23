import gameReducer from "./gameReducer.js";

describe('gameReducer', () => {

    test('initialises with correct inital state', () => {
        const initState = gameReducer(undefined, {type: '@@INIT'});

        expect(initState).toEqual({
            socket: null,
            players: [],
            roomNumber: null,
            gameSettings: {},
            questions: [],
            submissions: [],
            currentPlayer: '',
            error: null,
            results: []
        })
    })

    test('UPDATE_SOCKET', () => {
        const fakeState = gameReducer({socket: null}, {type: 'UPDATE_SOCKET', payload: 'testSocketObj'});

        expect(fakeState).toEqual({socket: 'testSocketObj'});
    })

    test('ADD_PLAYER', () => {
        const fakeState = gameReducer({players: [], roomNumber: null}, { type: 'ADD_PLAYER', payload: {player: 'testPlayer', room: 44} });

        expect(fakeState).toEqual({players: ['testPlayer'], roomNumber: 44});
    })
})
