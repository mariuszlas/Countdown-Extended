import React from 'react';
import Logo from '../../imgs/logo.png';
import { useHistory } from 'react-router-dom'
import '../styles.css'

const Header = () => {
    const history = useHistory();
    
    return (
        <header>
            <img src={Logo} className="logo" alt="our logo" onClick={() => history.push('/')}/>
        </header>
    );
}
export default Header;
