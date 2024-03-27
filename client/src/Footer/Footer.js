import React from 'react';
import './Footer.css'
import { useTranslation } from "react-i18next";

/**
 * show the contact information for the website
 * @returns {Component} Footer
 * @author Maedeh hassani
 */
const Footer = () => {
    const { t } = useTranslation();
    return (
            <footer>
                <p id="footer-contact">
                    {t("footer.contact")}<br />
                    {t("footer.address")}<br />
                    {t("footer.email")}<a href='url' id='footer-a'>instacat@gmail.com</a><br />
                    {t("footer.rights")}
                </p>

                <p id="footer-info">
                    {t("footer.semester")}<br />
                    {t("footer.student01")}<br />
                    {t("footer.student02")}<br />
                    {t("footer.student03")}<br />
                    {t("footer.student04")}
                </p>
            </footer>        
    );
}

export default Footer;