import React from 'react';
import myLogo from '../images/logo01.png'
import defaultProfile from '../images/default-profile.png'


 
const Header = () => {
    return (
        <header>
            <img src={myLogo} alt="logo" id="logo"></img>
            {/* <h1>InstaCat</h1> */}
                <div id='profile-div'>
                    <img src={defaultProfile} alt="profile" id="profile-img"></img>
                    <p id='user-name'>user-name</p>                
                </div>            
        </header>
    );
}
 
export default Header;