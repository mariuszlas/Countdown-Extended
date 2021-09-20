import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './index.css';

import { Home, GameSetup, WaitingRoom, JoinRoom } from './pages';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/setup">
                    <GameSetup />
                </Route>
                <Route path="/room">
                    <WaitingRoom />
                </Route>
                <Route path="/join">
                    <JoinRoom />
                </Route>
            </Switch>
        </>
    );
}

export default App;
