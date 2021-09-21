import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, Footer } from './layout';
import { Home, GameSetup, WaitingRoom, JoinRoom, GameResults, AllResults, QuizPage } from './pages';
import background from './imgs/backgroundLarger.jpg'

import './index.css';

function App() {
    return (
        <div style={{
                backgroundImage: `url(${background})`,
                backgrondSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
            <div style={{
                height: '100vh',
            }}>
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
            </div>
        </div>
    );
}

export default App;

