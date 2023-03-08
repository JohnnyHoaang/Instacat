import React from 'react';
import './Header.css'
import myLogo from '../images/logo01.png'
import defaultProfile from '../images/default-profile.png'


/**
 * display the logo and user photo and the registration part
 * @returns {Component} Header
 * @author Maedeh hassani 
 */
const Header = (props) => {
    return (
        <header>
            <img src={myLogo} alt="logo" id="logo"></img>
                <div id='profile-div'>
                    <img src={defaultProfile} alt="profile" id="profile-img"></img>
                    <p id='user-name'><a href="url">user-name</a></p>                
                </div>            
        </header>
    );
}
 
export default Header;