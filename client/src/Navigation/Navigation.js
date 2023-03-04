import React from 'react';
import './Navigation.css'
import { useState } from 'react';


/**
 * show all the option for the page and also user can search by hastags
 * @returns {Component} Navigation
 * @author Maedeh hassani 
 */ 
const Navigation = () => {

    const [isFrench, setIsFrench] = useState(false);

    function toggleLanguage() {
      setIsFrench(!isFrench);
    }
  
    function changeLang() {
      toggleLanguage();
      const langSec = document.getElementById('lang-sec');
      if (isFrench) {
        langSec.textContent = 'Eng';
      } else {
        langSec.textContent = 'Fr';
      }
    }


    return (
        <nav className='navigation-bar'>
            <div className='nav-div'><a href='/'>Home</a></div>
            <div className='nav-div'><a href='/discover'>Discover</a></div>
            <div className='nav-div'><a href='/adopt'>Adopt</a></div>
            <div className='nav-div'><a href='/aboutUs'>About us</a></div>
            <div id='lang' onClick={ () => changeLang()}><section id="lang-sec">Eng</section></div>
            
            <form role="search" id="form">
                <input type="search" id="query" name="q"
                placeholder="Search..."
                aria-label="Search through site content"/>
                <button>
                    <svg viewBox="0 0 1024 1024">
                        <path className="path1" d="M848.471 928l-263.059-263.059c-48.941 
                        36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 
                        312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 
                        263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 
                        218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 
                        0-218.455 97.091-218.455 218.455z"></path></svg>
                </button>
            </form>
        </nav>
    );
}
 
 
export default Navigation;