import React from 'react';
import searchIcon from '../images/search-icon.jpg'
 
const Navigation = () => {
    return (
        <nav className='navigation-bar'>
            <div className='nav-div'><a href='/home'>🐾Home</a></div>
            <div className='nav-div'><a href='url'>🐾Discover</a></div>
            <div className='nav-div'><a href='url'>🐾Adopt</a></div>
            <div className='nav-div'><a href='url'>🐾About us</a></div>
            <div><img src={searchIcon} alt="search" id="search"></img></div>
        </nav>
    );
}
 
 
export default Navigation;