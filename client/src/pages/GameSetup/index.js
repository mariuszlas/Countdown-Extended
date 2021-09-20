import React, { useState, useEffect } from 'react';

function GameSetup() {
    function handleSubmit(e) {
        e.preventDefault();
        // send the username and game settings (diffcullty, category, etc.)
        // to the redux store
        document.location = '/room';
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="submit" className="button"/>
        </form>
    );
}

export default GameSetup;
