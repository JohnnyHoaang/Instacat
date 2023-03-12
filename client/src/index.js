import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AboutUs from './AboutUs/AboutUs';
import Discover from './Discover/Discover';
import Adopt from './Adopt/Adopt';
import CatDetails from './CatDetails/CatDetails'
import PostForm from './Upload/PostForm'
import SameHashtag from './Hashtag/SameHashtag'
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

/**
 * creating the react routes for the website
 * @author Maedeh hassani 
 */
const router = createBrowserRouter(
    [
        { path: "/", element: <App /> },
        { path: "/discover", element: <Discover /> },
        { path: "/adopt", element: <Adopt /> },
        { path: "/aboutUs", element: <AboutUs /> },
        { path: "/cats/:id", element: <CatDetails /> },
        { path: "/add/post", element: <PostForm /> },
        { path: "hastag/:hastag", element: <SameHashtag />}
    ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();