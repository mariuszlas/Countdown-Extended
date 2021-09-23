import React from 'react';
import Logo from '../../imgs/logo.png';

import '../styles.css'

function redirect(e) {
    e.preventDefault();
    document.location = '/';
}

const Header = () => {
    return (
        <header>
            <img src={Logo} className="logo" alt="our logo" onClick={redirect}/>
        </header>
    );
}
export default Header;
