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

    test('UPDATE_GAME_SETTINGS', () => {
        const fakeState = gameReducer({ gameSettings: {} }, { type: 'UPDATE_GAME_SETTINGS', payload: {difficulty: 'Hard', category: 88, categoryName: 'cats'} });

        expect(fakeState).toEqual( {gameSettings: {difficulty: 'Hard', category: 88, categoryName: 'cats'} });
    })

    test('ADD_QUESTIONS', () => {
        const fakeState = gameReducer({ questions: [] }, { type: 'ADD_QUESTIONS', payload: ['Q1', 'Q2', 'Q3'] });

        expect(fakeState).toEqual({ questions: ['Q1', 'Q2', 'Q3'] });
    })

    test('CURRENT_PLAYER', () => {
        const fakeState = gameReducer({currentPlayer: ''}, {type: 'CURRENT_PLAYER', payload: 'testCurrentPlayer'});

        expect(fakeState).toEqual({currentPlayer: 'testCurrentPlayer'});
    })

    test('SET_ERROR', () => {
        const fakeState = gameReducer({error: null}, {type: 'SET_ERROR', payload: 'testError'});

        expect(fakeState).toEqual({error: 'testError'});
    })

    test('RESET_SCORE', () => {
        const fakeState = gameReducer({ currentPlayer: 'player', submissions: ['asdf'], players: [{username: 'otherPlayer', totalScore: 5}, {username: 'player', totalScore: 9}] }, {type: 'RESET_SCORE', payload: 0});

        expect(fakeState).toEqual({currentPlayer: 'player', submissions: [], players: [{username: 'otherPlayer', totalScore: 5}, {username: 'player', totalScore: 0}]});
    })

    test('UPDATE_SUBMISSIONS', () => {
        const fakeState = gameReducer({submissions: ['firstSub', 'secondSub']}, {type: 'UPDATE_SUBMISSIONS', payload: 'thirdSub'});

        expect(fakeState).toEqual({submissions: ['firstSub', 'secondSub', 'thirdSub']});
    })

    test('UPDATE_SCORE', () => {
        const fakeState = gameReducer({ currentPlayer: 'thePlayer', players: [{username: 'differentPlayer', totalScore: 99}, {username: 'thePlayer', totalScore: 68}] }, {type: 'UPDATE_SCORE', payload: 2});

        expect(fakeState).toEqual({currentPlayer: 'thePlayer', players: [{username: 'differentPlayer', totalScore: 99}, {username: 'thePlayer', totalScore: 70}]});
    })

    test('UPDATE_RESULTS', () => {
        const fakeState = gameReducer({results: ['a', 'a', 'a', 'b']}, {type: 'UPDATE_RESULTS', payload: ['b', 'c']});

        expect(fakeState).toEqual({results: ['a', 'b', 'c']});
    })
})
