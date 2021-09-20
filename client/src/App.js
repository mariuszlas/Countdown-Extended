import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, Footer } from './layout';
import { Home, GameSetup, WaitingRoom, JoinRoom, GameResults, AllResults, QuizPage } from './pages';

import './index.css';

function App() {
    return (
        <>
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
                    <Route path="/game-results">
                        <GameResults />
                    </Route>
                    <Route path="/all-results">
                        <AllResults />
                    </Route>
                    <Route path="/quiz-page">
                        <QuizPage />
                    </Route>
                </Switch>
            <Footer />
        </>
    );
}

export default App;

