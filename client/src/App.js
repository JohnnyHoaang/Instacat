import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/MainContainer.js'
import Footer from './Footer/Footer.js';
import Navigation from './Navigation/Navigation.js';

function App() {

    return(
      <div className="App">
        <Header 
        // username={"username"}
        />
        <Navigation />
        <Main />
        <Footer />
      </div>
    );
  }
 
 
export default App;
