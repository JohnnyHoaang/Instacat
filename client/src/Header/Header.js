import React, { useState } from 'react';
import './Header.css'
import myLogo from '../images/logo01.png'
import defaultProfile from '../images/default-profile.png'
import { GoogleLogin } from '@react-oauth/google';



const Header = () => {

    const [username, setUsername] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

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
        // Sets the username and profile picture to be used in other views
        setUsername(data.user.name)
        setProfilePicture(data.user.picture)
    }

    const handleError = error => {
        console.error(error);
    }

    const handleLogout = async () => {
        await fetch("/auth/logout");
        setUsername("");
        setProfilePicture("");
    }


    return (
        <header>
            <img src={myLogo} alt="logo" id="logo"></img>
            <div id='profile-div'>
                <div className='profile-img-div'>
                    <img src={profilePicture || defaultProfile} alt="profile" id="profile-img"></img>
                </div>
                <div className='profile-google-div'>
                    {!username && <GoogleLogin
                        onSuccess={handleLogin}
                        onError={handleError}
                    />}
                    {username && <button onClick={handleLogout}>Logout</button>}
                </div>
                <div className='profile-guest-div'>
                    <p>{username ? username : "Guest"}</p>
                </div>
                
            </div>
        </header>
    );
}


export default Header;