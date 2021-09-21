import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer, Header } from './layout';
import {
    AllResults,
    CorrectAnswers,
    GameResults,
    GameSetup,
    Home,
    JoinRoom,
    QuizPage,
    WaitingRoom
} from './pages';

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
                <Route path="/answers">
                    <CorrectAnswers />
                </Route>
            </Switch>
            <Footer />
        </>
    );
}

export default App;
