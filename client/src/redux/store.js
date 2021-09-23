import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import gameReducer from './gameReducer';

const store = createStore(
    gameReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
const persistor = null;

export { store, persistor };
