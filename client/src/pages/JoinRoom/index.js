import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { checkForDuplicateUsernames } from '../../redux/actions.js';

function JoinRoom() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [roomNo, setRoomNo] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = await dispatch(checkForDuplicateUsernames(username, roomNo, false));

        if (!isValid) {
            alert('This username has already been taken');
            setUsername('');
        } else {
            history.push('/waiting-room');
        }
    }

    return (
        <main>
            <section>
                <p role="game-instructions">
                    To join your friends waiting room, enter your username and the room number!
                </p>
            </section>
            <form role="game-setup" onSubmit={e => handleSubmit(e)}>
                <input type="text" id="username" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                <br />
                <input type="text" id="roomNo" placeholder="room number" value={roomNo} onChange={e => setRoomNo(e.target.value)} required/>
                <br />
                <input id="submit" type="submit" value="Join the Waiting Room" />
            </form>
        </main>
    );
}

export default JoinRoom;
