import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';



function AboutUs() {
  
    return(
      <div className="AboutUs">
        <Header />
        <Navigation />
        <p>AboutUs</p>
        <div> <a href="/">home</a></div>
        <Footer />
      </div>
    );
  }
 
 
export default AboutUs;