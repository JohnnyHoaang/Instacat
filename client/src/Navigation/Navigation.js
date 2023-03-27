import React from 'react';
import './Navigation.css'
import { useState } from 'react';
import i18n from "i18next";
import { useTranslation } from "react-i18next";



/**
 * show all the option for the page and also user can search by hastags
 * @returns {Component} Navigation
 * @author Maedeh hassani 
 */
const Navigation = (props) => {

    const [isFrench, setIsFrench] = useState(false);
    /**
     * Search for cat post using query from form
     * @param {Event} e 
     */
    function searchPosts(e) {
        e.preventDefault()
        let query = document.querySelector('#query').value
        let url = `/api/search/${query}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.Error);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                props.setCards(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    function toggleLanguage() {
        setIsFrench(!isFrench);
    }

    function changeLang() {
        toggleLanguage();
        const langSec = document.getElementById('lang-sec');
        if (isFrench) {
            langSec.textContent = 'Fr';
            i18n.changeLanguage('en');
        } else {
            langSec.textContent = 'Eng';
            i18n.changeLanguage('fr');
        }
    }

    const { t } = useTranslation();
    return (

        <nav className='navigation-bar'>
            <div className='nav-div'><a href='/'>{t('navigation.home')}</a></div>
            <div className='nav-div'><a href='/discover'>{t('navigation.discover')}</a></div>
            <div className='nav-div'><a href='/adopt'>{t('navigation.adopt')}</a></div>
            <div className='nav-div'><a href='/aboutUs'>{t('navigation.aboutUs')}</a></div>
            <div id='lang' onClick={() => changeLang()}><section id="lang-sec">Fr</section></div>

            <form role="search" id="form" onSubmit={searchPosts}>
                <input type="search" id="query" name="q"
                    placeholder={t('navigation.search')}
                    aria-label="Search through site content" />
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