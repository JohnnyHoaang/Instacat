import React from 'react';
import './Footer.css'
import { useTranslation} from "react-i18next"; 

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
// const Footer = () => {
//     const { t } = useTranslation();
//     return (
//         <footer>
           
//             <p id="footer-contact">
//                 Contact us <br/>
//                 Address: Montreal, InstaCat <br/>
//                 Email: <a href='url' id='footer-a'>instacat@gmail.com </a><br/>
//                 © 2023 All rights reserved — Montreal InstaCat
//             </p>
//             <p id="footer-info">
//                 620_Winter-Project_2023<br/>
//                 student01: (Kelsey Pereira Costa, 2020202) <br/>
//                 student02: (Maedeh Hassani, 1942575) <br/>
//                 student03: (Bogdan Andrei Ivan, 2020202) <br/>
//                 student04: (Johnny Hoang, 2020202)
//             </p>  
//         </footer>

//     );
// }

 
// export default Footer;