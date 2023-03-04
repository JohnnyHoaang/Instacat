import React from 'react';
import './Header.css'
import myLogo from '../images/logo01.png'
import defaultProfile from '../images/default-profile.png'
import { GoogleLogin } from '@react-oauth/google';


 
const Header = () => {

    const handleLogin = async googleData => {
        const res = await fetch("/auth", {
            method: "POST",
            body: JSON.stringify({
            token: googleData.credential
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        // we will come back to this, since our server will be replying with our info
      }
      
    const handleError = error => {
        console.error(error);
    }

    return (
        <header>
            <img src={myLogo} alt="logo" id="logo"></img>
            {/* <h1>InstaCat</h1> */}
                <div id='profile-div'>
                    <GoogleLogin 
                        onSuccess={handleLogin}
                        onError={handleError}
                    />
                    <img src={defaultProfile} alt="profile" id="profile-img"></img>
                </div>            
        </header>
    );
}

 
export default Header;