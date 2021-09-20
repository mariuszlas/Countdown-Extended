import React from 'react';
import Logo from '../../imgs/logo.png';

import '../styles.css'

const Header = () => {
    return (
        <header>
            <img src={Logo} className="logo" alt="our logo"/>
        </header>
    );
}
export default Header;