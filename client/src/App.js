import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/MainContainer.js'
import Footer from './Footer/Footer.js';
import Navigation from './Navigation/Navigation.js';
import { useEffect, useState } from 'react';

function App() {

  let [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
            
    let url = "http://localhost:9000/testAPI";
    fetch(url)
    .then(response => response.text())
    .then(data => setApiResponse(data))
    .catch(err => console.log(err.message))
    }, []);
  
    return(
      <div className="App">
        <Header />
        <Navigation />
        <Main />
        <p className="App-itro">this is from server: {apiResponse}</p>
        <Footer />
      </div>
    );
  }
 
 
export default App;
