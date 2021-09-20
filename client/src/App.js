import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, GameSetup, WaitingRoom, JoinRoom, GameRoom, GameResults, AllResults } from './pages';
import { Header, Footer } from './layout';
import Background from './imgs/background.jpg';

import './index.css';

function App() {
    return (
        <>
            <Header />
            <div styles={{ backgroundImage:`url(${Background})` }}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/game-setup">
                        <GameSetup />
                    </Route>
                    <Route path="/join-room">
                        <JoinRoom />
                    </Route>
                    <Route path="/waiting-room">
                        <WaitingRoom />
                    </Route>
                    <Route path="/game-room">
                        <GameRoom />
                    </Route>
                    <Route path="/game-results">
                        <GameResults />
                    </Route>
                    <Route path="/all-results">
                        <AllResults />
                    </Route>
                </Switch>
                </div>
            <Footer /> 
        </>
    );
}

export default App;

