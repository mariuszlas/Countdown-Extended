import React, { useState, useEffect } from 'react';
import '../index.css'

function Home() {

    //redirect to the game setup page
    function newGame(e) {
        e.preventDefault();
        document.location = '/game-setup';
    }

    function joinGame(e) {
        e.preventDefault();
        document.location = '/join-room';
    }

    function leaderBoards(e) {
        e.preventDefault();
        document.location = '/all-results';
    }

    return (
        <>                  
        <div className="spacing">
                <form onSubmit={newGame}>
                    <button type="submit" className="button">Start a New Game!</button>
                </form>
                <br/>
                <form onSubmit={joinGame}>
                    <button type="submit" className="button">Join a Game!</button>
                </form>
                <br/>
                <form onSubmit={leaderBoards}>
                    <button type="submit" className="button">Check the Leaderboards!</button>
                </form>
            </div>
        </>
    );
}

export default Home;
