import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AboutUs from './AboutUs/AboutUs';
import Discover from './Discover/Discover';
import Adopt from './Adopt/Adopt';
// import Cards from './Main/Crads';
import CatDetails from './CatDetails/CatDetails'
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';


const router = createBrowserRouter(
 [
  { path : "/",  element : <App /> },
  { path : "/discover", element : <Discover />},
  { path : "/adopt", element : <Adopt />},
  { path : "/aboutUs", element : <AboutUs />},
  { path : "/cats/:id", element: <CatDetails />}

 ] 
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();


// STORAGE_ACCOUNT_NAME=azuretest2036759
// CONTAINER_NAME=helloblob
// AZURE_SAS=sp=racwdli&st=2023-02-20T17:17:22Z&se=2023-11-10T01:17:22Z&spr=https&sv=2021-06-08&sr=c&sig=z0J8mgIgJ1mATHazC8k6wfR%2FRHWpOcTeWtPvFHbcP2M%3D
// ATLAS_URI=mongodb+srv://maedeh:SQ2XxmT3VNWh75aQ@cluster0.cebsx9s.mongodb.net/?retryWrites=true&w=majority