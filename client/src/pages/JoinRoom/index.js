import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addPlayer, addCurrentPlayer } from '../../redux/actions.js';

const url = 'http://localhost:5001';

function JoinRoom() {

    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const roomNo = e.target.roomNo.value;

        dispatch(addPlayer(username, roomNo, false));
        dispatch(addCurrentPlayer(username));
        history.push('/waiting-room');
    }

    return (
        <>
        <nav>
            {/*Home button*/}
        </nav>
        <main>
            <p role="game-instructions">To join the waiting room, enter the room number and your username</p>
            <form role="game-setup" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="username"></label>
                <input type="text" id="username" placeholder='username' required/>

                <label htmlFor="roomNo"></label>
                <input type="text" id="roomNo" placeholder='room number' required/>

                <label htmlFor="submit"></label>
                <input id="submit" type="submit" value="Join the Waiting Room"/>
            </form>
            </main>
        </>
    );
}

export default JoinRoom;
