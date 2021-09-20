import React from 'react';
import Logo from './logo.png';

import '../styles.css'

const Header = () => {
    return (
        <nav>
            <img src={Logo} className="logo" alt="our logo"/>
        </nav>
    );
}
export default Header;