import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AboutUs from './AboutUs/AboutUs';
import Discover from './Discover/Discover';
import Adopt from './Adopt/Adopt';
import Cards from './Main/Crads';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';


const router = createBrowserRouter(
 [
  { path : "/",  element : <App /> },
  { path : "/discover", element : <Discover />},
  { path : "/adopt", element : <Adopt />},
  { path : "/aboutUs", element : <AboutUs />},
  { path : "/cats/:id", element: <Cards />}
 ] 
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
