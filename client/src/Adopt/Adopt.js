import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import './Adopt.css'
import AdoptionCards from './AdoptionCards.js'

/**
 * the pages that clients are able to adapt the cats
 * @returns {Component} Adopt
 * @author Maedeh hassani
 * 
 */
function Adopt() {
  let [adoptionCards, setAdoptionCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  // npx json-server --watch data/dataAdoption.json --port 3004
  useEffect(() => {
    //let url = 'api/adoption/all'
    let url = "http://localhost:3004/adoption"
    fetch(url)
    .then(response => {
    if (!response.ok) {
        throw new Error('fetching issue', response.Error);
    } else {
        return response.json();
    }})
    .then(data => {
        setAdoptionCards(data);
        
    })
    .catch(err => {
        console.log(err.message);
    })
  }, []);

  function deleting(index){
    let listOfBook = [...adoptionCards];
    listOfBook.splice(index, 1);
    setAdoptionCards(listOfBook);
  }


  // Calculate the starting and ending index of the cards to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = adoptionCards.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(Math.ceil(adoptionCards.length / cardsPerPage), currentPage + 1);
    i++
  ) {
    pageNumbers.push(i);
  }

    return(
      <div className="Adopt">
        <Header />
        <Navigation />
        <div id='adopt-top'>
            <p id='cat-quote'>“There are few things in life more heartwarming than to be welcomed by a cat.”</p>
            <p id='quote-narrator'>Tay Hohoff</p>
        </div>
        <section className='card-container'>
                    {currentCards.map((item, index) => ( 
                        <div key={index} className='each-card-outer'>
                        <AdoptionCards 
                            id={item.id}
                            index={index}   
                            imageUrl={item.image}
                            deleting = {deleting}
                        />
                        </div>
                    ))}
            </section>
          {/* adding next and pre button for pagination section */}
          <div className="pagination">
                {currentPage > 1 && (
                <button className='pre-btn-pagination' onClick={() => paginate(currentPage - 1)}>{`Pre<<`}</button>
                )}
                {pageNumbers.map((number) => (
                <button 
                    key={number}
                    className="btn-pagination"
                >
                    {number}
                </button>
                ))}
                {currentPage <
                Math.ceil(adoptionCards.length / cardsPerPage) - 1 && (
                <button onClick={() => paginate(currentPage + 1)}>{'>>Next'}</button>
                )}
            </div>
        <Footer />
      </div>
    );
  }
 
 
export default Adopt;