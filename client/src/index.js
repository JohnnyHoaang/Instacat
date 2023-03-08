import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AboutUs from './AboutUs/AboutUs';
import Discover from './Discover/Discover';
import Adopt from './Adopt/Adopt';
import PostForm from './Upload/PostForm'
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter(
 [
  { path : "/",  element : <App /> },
  { path : "/discover", element : <Discover />},
  { path : "/adopt", element : <Adopt />},
  { path : "/aboutUs", element : <AboutUs />},
  { path : "/add/post", element : <PostForm/>},
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
