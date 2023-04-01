import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/MainContainer.js'
import Footer from './Footer/Footer.js';
import Navigation from './Navigation/Navigation.js';
import AboutUs from './AboutUs/AboutUs';
import Adopt from './Adopt/Adopt';
import Admin from './Admin/Admin'
import CatDetails from './CatDetails/CatDetails'
import PostForm from './Upload/PostForm'
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import languages from './languages'
import EditProfileForm from './Upload/EditProfileForm.js';
import SameHashtag from './Hashtag/SameHashtag.js';
import { useState } from 'react';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(languages);

/**
 * display the home page of the website
 * @returns {Component} App
 * @author Maedeh hassani 
 */
function App() {
  // Move to App
  const [username, setUsername] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState("")
  const [cards, setCards] = useState([])
  /**
  * creating the react routes for the website
  * @author Maedeh hassani 
  */
  const router =
    <Routes>
      <Route path="/" element={<Main cards={cards} setCards={setCards} email={email} 
        isAdmin={isAdmin}
        token={token} />} />
      <Route path="/discover" element={<Discover cards={cards} setCards={setCards} />} />
      <Route path="/adopt" element={<Adopt />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/cats/:id" element={<CatDetails username={username}/>} />
      <Route path="/add/post" element={<PostForm username={username}/>} />
      <Route path="/edit/profile" element={
        <EditProfileForm
          email={email}
          username={username}
          setUsername={setUsername}
          setProfilePicture={setProfilePicture}
        />
      }
      />
      <Route path="/catHashtags/:hashtag" element={<SameHashtag />} />
      {isAdmin && <Route path="/admin" element={<Admin email={email} isAdmin={isAdmin} token={token}/>} />}
    </Routes>
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <div className="App">
          <Header
            username={username} profilePicture={profilePicture}
            isAdmin={isAdmin}
            setUsername={setUsername}
            setProfilePicture={setProfilePicture}
            setEmail={setEmail}
            setIsAdmin={setIsAdmin}
            setToken={setToken}
          />
          <Navigation isAdmin={isAdmin} setCards={setCards} />
          {router}
          <Footer />
        </div>
      </I18nextProvider>
    </BrowserRouter>
  );


}

export default App;