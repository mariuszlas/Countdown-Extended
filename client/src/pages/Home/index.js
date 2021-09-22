import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
    return (
        <>
            <div className="spacing">
                <Link to="/game-setup" className="button link">
                    Start a New Game!
                </Link>
                <br />
                <Link to="/join-room" className="button link">
                    Join a Game!
                </Link>
                <br />
                <Link to="/all-results" className="button link">
                    Check the Leaderboards!
                </Link>
            </div>
        </>
    );
}

export default Home;
