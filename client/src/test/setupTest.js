import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";

import userEvent from "@testing-library/user-event";
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux/gameReducer.js'

const TestProviders = ({ initState }) => {
    initState ||= {
        socket: null,
        players: [],
        roomNumber: null,
        gameSettings: {},
        questions: [],
        currentPlayer: '',
        error: null
    };

    const testReducer = () => reducer(initState, { type: '@@INIT' })
    const testStore = createStore(testReducer, applyMiddleware(thunk))

    return ({ children }) => (
        <Provider store={testStore}>
            <Router>
                { children }
            </Router>
        </Provider>
    )
}

const renderWithReduxAndRouter = (uiElement, options={}) => {
    let TestWrapper = TestProviders(options)
    render(uiElement, { wrapper: TestWrapper, ...options })
}

global.renderWithReduxAndRouter = renderWithReduxAndRouter
global.React = React;
global.render = render;
global.userEvent = userEvent;
