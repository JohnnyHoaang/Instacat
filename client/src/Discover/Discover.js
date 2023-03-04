import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

/**
 * Check the cats which posted by other users ??????
 * @returns {Component} Discover
 * @author Maedeh hassani  
 */
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