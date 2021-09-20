import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, GameSetup, WaitingRoom, JoinRoom, GameRoom, GameResults, AllResults } from './pages';
import { Header, Footer } from './layout';

import './index.css';

function App() {
    return (
        <>
    <div style={{backgroundImage: `url(${require("../src/imgs/background.jpg")})`,}} className="index">
        </div>
            <Header />
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
            <Footer /> 
        </>
    );
}

export default App;

