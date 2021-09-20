import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

//basic root, will be altered later

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
=======
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from './redux/store';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <App />
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
>>>>>>> ef01bf1a60f76ad8d625d458a18ac4f5422b4e1f
