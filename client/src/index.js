import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AboutUs from './AboutUs/AboutUs';
import Discover from './Discover/Discover';
import Adopt from './Adopt/Adopt';
import reportWebVitals from './reportWebVitals';

import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// install --> npm install react-router-dom
const router = createBrowserRouter(
 [
  { path : "/",  element : <App /> },
  { path : "/discover", element : <Discover />},
  { path : "/adopt", element : <Adopt />},
  { path : "/aboutUs", element : <AboutUs />},
 ] 
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
