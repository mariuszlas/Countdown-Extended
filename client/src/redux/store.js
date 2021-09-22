import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import gameReducer from './gameReducer';

const persistConfig = {
    key: 'root',
    storage
};

// const persistedReducer = persistReducer(persistConfig, gameReducer);
// const store = createStore(
//     persistedReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );
// const persistor = persistStore(store);

const store = createStore(
    gameReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
const persistor = null;

export { store, persistor };
