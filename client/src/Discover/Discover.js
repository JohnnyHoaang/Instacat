import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';


function Discover() {
  
    return(
      <div className="Discover">
        <Header />
        <Navigation />
        <p>discover</p>
        <div> <a href="/">home</a></div>
        <Footer />
      </div>
    );
  }
 
 
export default  Discover;