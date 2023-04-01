import React, { useState } from 'react';
import './Header.css'
import myLogo from '../images/logo01.png'
import defaultProfile from '../images/default-profile.png'
import { GoogleLogin } from '@react-oauth/google';
import { Link } from "react-router-dom"


/**
 * Page that has information about the website
 * @returns {Component} AboutUs
 * @author Maedeh hassani
 * @author Kelsey Pereira Costa
 */
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
    props.setTokens(data.tokens)
  }

  const handleError = error => {
    console.error(error);
  }

  const handleLogout = async () => {
    await fetch("/auth/logout");
    props.setUsername("");
    props.setProfilePicture("");
    props.setEmail("");
    props.setIsAdmin(false);
    props.setTokens({})
  }


  return (
    <header>
      <img src={myLogo} alt="logo" id="logo"></img>
      <div id='profile-div'>
        <div className='profile-img-div'>
          {props.username ?
             // Links to edit profile form if logged in
            <Link to='/edit/profile'>
              <img src={props.profilePicture || defaultProfile} alt="profile" id="profile-img">
              </img>
            </Link>
            :
            // Does not redirect to edit profile
            <img src={props.profilePicture || defaultProfile} alt="profile" id="profile-img">
            </img>

          }

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