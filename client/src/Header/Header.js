import React, { useState } from 'react';
import './Header.css'
import myLogo from '../images/logo01.png'
import defaultProfile from '../images/default-profile.png'
import { GoogleLogin } from '@react-oauth/google';
import { Link } from "react-router-dom"

const Header = (props) => {
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
    // Sets the username, profile picture and email to be used in other views
    props.setUsername(data.user.name)
    props.setProfilePicture(data.user.picture)
    props.setEmail(data.user.email)
  }

  const handleError = error => {
    console.error(error);
  }

  const handleLogout = async () => {
    await fetch("/auth/logout");
    props.setUsername("");
    props.setProfilePicture("");
    props.setEmail("")
  }


  return (
    <header>
      <img src={myLogo} alt="logo" id="logo"></img>
      <div id='profile-div'>
        <div className='profile-img-div'>
          <Link to='/edit/profile'>
            <img src={props.profilePicture || defaultProfile} alt="profile" id="profile-img"></img>
          </Link>
        </div>
        <div className='profile-guest-div'>
          <p>{props.username ? props.username : "Guest"}</p>
        </div>
        <div className='profile-google-div'>
          {!props.username && <GoogleLogin
            onSuccess={handleLogin}
            onError={handleError}
          />}
          {props.username && <button onClick={handleLogout}>Logout</button>}
        </div>


      </div>
    </header>
  );
}


export default Header;