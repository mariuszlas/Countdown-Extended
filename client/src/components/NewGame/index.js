import React from 'react';
import { useHistory } from "react-router-dom";

function NewGame() {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `newPath`; 
        history.push(path);
    }

    return <button id="back-button" onClick={routeChange}>Back</button>

}

export default NewGame;
