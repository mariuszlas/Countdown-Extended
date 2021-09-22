import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addCurrentPlayer, addPlayer } from '../../redux/actions.js';

const url = 'http://localhost:3000';

function JoinRoom() {

    const dispatch = useDispatch();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const roomNo = e.target.roomNo.value;

        const isValid = await checkUsername(username);

        if (!isValid) {
            alert(`'${username}' is already taken. Try another one.`);
            e.target.username.value = '';
            return;
        }

        dispatch(addPlayer(username, roomNo, false));
        dispatch(addCurrentPlayer(username));
        history.push('/waiting-room');
    }

        async function checkUsername(username) {
            try {
                await axios.post('http://localhost:3000/usernames', { name: username });
                return true;
            } catch (error) {
                return false;
            }
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
                <br/>
                <label htmlFor="roomNo"></label>
                <input type="text" id="roomNo" placeholder='room number' required/>
                <br/>
                <label htmlFor="submit"></label>
                <input id="submit" type="submit" value="Join the Waiting Room"/>
            </form>
            </main>
        </>
    );
}

export default JoinRoom;
