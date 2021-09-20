import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const url = 'http://localhost:5001';

function JoinRoom() {
    function handleSubmit(e) {
        e.preventDefault();
        const socket = io(url);

        // send the roomID and username to the store
        // document.location = '/room';
    }

    return <form onSubmit={handleSubmit}></form>;
}

export default JoinRoom;
