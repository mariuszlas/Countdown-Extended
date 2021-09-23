import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { addQuestions, updateScore, addCurrentPlayer, setError, updatePlayerResults, calcDuration, calcScoreIncrement } from "./actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('redux actions', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    })

    
    test('addQuestions action', () => {
        store.dispatch(addQuestions(['Q1', 'Q2']));

        expect(store.getActions()).toEqual([{ type: 'ADD_QUESTIONS', payload: ['Q1', 'Q2'] }]);
    })

    test('updateScore action', () => {
        store.dispatch(updateScore(55));

        expect(store.getActions()).toEqual([{ type: 'UPDATE_SCORE', payload: 55 }]);
    })

    test('addCurrentPlayer action', () => {
        store.dispatch(addCurrentPlayer('testCurrentPlayer'));

        expect(store.getActions()).toEqual([{ type: 'CURRENT_PLAYER', payload: 'testCurrentPlayer' }]);
    })

    test('setError action', () => {
        store.dispatch(setError('testError'));

        expect(store.getActions()).toEqual([{ type: 'SET_ERROR', payload: 'testError' }]);
    })
})
