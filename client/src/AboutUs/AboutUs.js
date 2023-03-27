import { useTranslation } from "react-i18next";
import './AboutUs.css'


/**
 * Page that has information about the website
 * @returns {Component} AboutUs
 * @author Maedeh hassani
 */
function AboutUs() {

    const { t } = useTranslation();
    return (
        <div className="AboutUs">
            <div id="about-us">
                <div id="about-us-main-text">
                    <div className='about-us-text-welcome'>{t("aboutUs.line01")}</div>
                    <div className='about-us-text'> &nbsp; {t("aboutUs.line02")}</div>
                    <div className='about-us-text'> {t("aboutUs.line03")}</div>
                    <div className='about-us-text-end'> {t("aboutUs.line04")}</div>
                     
                    <div className='about-us-text'> &nbsp; {t("aboutUs.line05")}</div>
                    <div className='about-us-text'> {t("aboutUs.line06")}</div>
                    <div className='about-us-text'> {t("aboutUs.line07")}</div>
                    <div className='about-us-text-end'> {t("aboutUs.line08")}</div>
                    
                    <div className='about-us-text'> &nbsp; {t("aboutUs.line09")} </div>
                    <div className='about-us-text'> {t("aboutUs.line10")} </div>
                    <div className='about-us-text'> {t("aboutUs.line11")} </div>
                    <div className='about-us-text-end'> {t("aboutUs.line12")} </div>
                    
                    <div className='about-us-text'> &nbsp; {t("aboutUs.line13")} </div>
                    <div className='about-us-text'> {t("aboutUs.line14")} </div>
                    <div className='about-us-text-end'> {t("aboutUs.line15années de compagnie heureuse")} </div>
                </div>
            
            </div>
            
        </div>
    );
}


export default AboutUs;