import React from 'react';
import searchIcon from '../images/search-icon.jpg'
 
const Navigation = () => {
    return (
        <nav className='navigation-bar'>
            {/* <ul>
                <li><a href='url'>🐾 Home</a></li>
                <li><a href='url'>🐾 Discover</a></li>
                <li><a href='url'>🐾 Adopt</a></li>
                <li><a href='url'>🐾 About us</a></li>
                <li><img src={searchIcon} alt="search" id="search"></img></li>
            </ul> */}
            <div><a href='url'>🐾Discover</a></div>
            <div><a href='url'>🐾Home</a></div>
            <div><a href='url'>🐾Discover</a></div>
            <div><a href='url'>🐾Adopt</a></div>
            <div><a href='url'>🐾About us</a></div>
            <div><img src={searchIcon} alt="search" id="search"></img></div>
        </nav>
    );
}
 
 
export default Navigation;