import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/MainContainer.js'
import Footer from './Footer/Footer.js';
import Navigation from './Navigation/Navigation.js';
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "footer.contact": "Contact us",
          "footer.address": "Address: Montreal, InstaCat",
          "footer.email": "Email: ",
          "footer.rights": "© 2023 All rights reserved — Montreal InstaCat",
          "footer.semester": "620_Winter-Project_2023",
          "footer.student01": "Student01 (Kelsey Pereira Costa, 2020202)",
          "footer.student02": "Student02 (Maedeh Hassani, 1942575)", 
          "footer.student03": "Student03 (Bogdan Andrei Ivan, 2020202)",
          "footer.student04": "Sstudent04 (Johnny Hoang, 2020202)",
          "navigation.home": "Home", 
          "navigation.discover": "Discover",
          "navigation.adopt": "Adopt",
          "navigation.aboutUs": "About us",
          "navigation.search": "Search..."
        }
      },
      fr: {
        translation: {
          "footer.contact": "Nous contacter",
          "footer.address": "Adresse : Montréal, InstaChat",
          "footer.email": "Courriel : ",
          "footer.rights": "© 2023 Tous droits réservés — Montréal InstaChat",
          "footer.semester": "620_Projet_hiver_2023",
          "footer.student01": "Étudiant(E)01 (Kelsey Pereira Costa, 2020202)",
          "footer.student02": "Étudiant(E)02 (Maedeh Hassani, 1942575)", 
          "footer.student03": "Étudiant(E)03 (Bogdan Andrei Ivan, 2020202)",
          "footer.student04": "Étudiant(E)04 (Johnny Hoang, 2020202)", 
          "navigation.home": "Accueil", 
          "navigation.discover": "Découvrir",
          "navigation.adopt": "Adopter",
          "navigation.aboutUs": "À propos de nous",
          "navigation.search": "Recherche..."
        }
      }
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

/**
 * display the home page of the website
 * @returns {Component} App
 * @author Maedeh hassani 
 */
function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <Header />
        <Navigation />
        <Main />
        <Footer />
      </div>
    </I18nextProvider>
  );
}
 
 
export default App;