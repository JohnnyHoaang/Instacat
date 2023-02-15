import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/MainContainer.js'
import Footer from './Footer/Footer.js';
import Navigation from './Navigation/Navigation.js';
import { useEffect, useState } from 'react';

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
