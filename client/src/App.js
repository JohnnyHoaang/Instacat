import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/MainContainer.js'
import Discover from './Discover/Discover';
import Footer from './Footer/Footer.js';
import Navigation from './Navigation/Navigation.js';
import AboutUs from './AboutUs/AboutUs';
import Adopt from './Adopt/Adopt';
import CatDetails from './CatDetails/CatDetails'
import PostForm from './Upload/PostForm'
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
    /**
    * creating the react routes for the website
    * @author Maedeh hassani 
    */
    const router = createBrowserRouter(
        [
            { path: "/", element: <Main /> },
            { path: "/discover", element: <Discover /> },
            { path: "/adopt", element: <Adopt /> },
            { path: "/aboutUs", element: <AboutUs /> },
            { path: "/cats/:id", element: <CatDetails /> },
            { path: "/add/post", element: <PostForm username={username} /> },
            { path: "/edit/profile", element: 
            <EditProfileForm 
                email={email}
                setUsername={setUsername}
                setProfilePicture={setProfilePicture}
            /> 
            },
            { path: "/catHashtags/:hashtag", element: <SameHashtag /> }
        ]
    )
    return (
        <I18nextProvider i18n={i18n}>
            <div className="App">
                <Header
                    username={username} profilePicture={profilePicture}
                    setUsername={setUsername} 
                    setProfilePicture={setProfilePicture}
                    setEmail={setEmail}
                />
                <Navigation />
                <RouterProvider router={router} />
                <Footer />
            </div>
        </I18nextProvider>
    );

}

export default App;