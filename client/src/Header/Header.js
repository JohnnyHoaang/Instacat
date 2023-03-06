import React, { useState } from 'react';
import './Header.css'
import myLogo from '../images/logo01.png'
import defaultProfile from '../images/default-profile.png'
import { GoogleLogin } from '@react-oauth/google';


 
const Header = () => {

    const [username, setUsername] = useState("")

    const handleLogin = async googleData => {
        const res = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
            token: googleData.credential
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        console.log(data)
        // we will come back to this, since our server will be replying with our info
        setUsername(data.user)
    }
      
    const handleError = error => {
        console.error(error);
    }

    const handleLogout = async () => {
        await fetch("/auth/logout");
        setUsername("");
      }


    return (
        <header>
            <img src={myLogo} alt="logo" id="logo"></img>
            {/* <h1>InstaCat</h1> */}
                <div id='profile-div'>
                    <img src={defaultProfile} alt="profile" id="profile-img"></img>
                    {!username && <GoogleLogin 
                        onSuccess={handleLogin}
                        onError={handleError}
                    />}
                    {username && <button onClick={handleLogout}>Logout</button>}
                    <p>{username ? username : "Guest"}</p>
                </div>            
        </header>
    );
}

 
export default Header;