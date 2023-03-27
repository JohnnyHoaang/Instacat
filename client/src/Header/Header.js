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
    props.setIsAdmin(data.user.isAdmin)
    if(data.user.isAdmin){
      props.setToken(data.token)
    }
  }

  const handleError = error => {
    console.error(error);
  }

  const handleLogout = async () => {
    await fetch("/auth/logout");
    if (props.isAdmin){
      props.setToken("")
    }
    props.setUsername("");
    props.setProfilePicture("");
    props.setEmail("");
    props.setIsAdmin(false);
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
          {props.username && <button onClick={handleLogout}><Link to="/" >Logout</Link></button>}
        </div>


      </div>
    </header>
  );
}


export default Header;