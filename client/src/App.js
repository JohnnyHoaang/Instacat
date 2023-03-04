import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/MainContainer.js'
import Footer from './Footer/Footer.js';
import Navigation from './Navigation/Navigation.js';

/**
 * display the home page of the website
 * @returns {Component} App
 * @author Maedeh hassani 
 */
function App() {

    return(
      <div className="App">
        <Header />
        <Navigation />
        <Main />
        <Footer />
      </div>
    );
  }
 
 
export default App;