import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

/**
 * the pages that clients are able to adapt the cats
 * @returns {Component} Adopt
 * @author Maedeh hassani
 * 
 */
function Adopt() {
  
    return(
      <div className="Adopt">
        <Header />
        <Navigation />
        <p>Adopt</p>
        <div> <a href="/">home</a></div>
        <Footer />
      </div>
    );
  }
 
 
export default Adopt;