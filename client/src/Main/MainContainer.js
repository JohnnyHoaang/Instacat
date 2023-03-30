import Cards from './Cards.js';
import './MainContainer.css';
import addingPost from '../images/adding-post.png';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"


/**
 * fetch all the cats information from api
 * and map through the list to creat each cat post 
 * @param {*} props 
 * @returns {Component} Main
 * @author Maedeh hassani 
 */
function Main(props) {
    
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 10;

    //npx json-server --watch data/data1.json --port 3002  
    useEffect(() => {
        let url = `/api/cat/all`;
        console.log('Switch page')
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fetching issue', response.Error);
                } else {
                    return response.json();
                }})
            .then(data => {
                props.setCards(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    },[]);

    // Calculate the starting and ending index of the cards to display
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = props.cards.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(Math.ceil(props.cards.length / cardsPerPage), currentPage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }

  return (
    <div className="main-top">
      <section id='top-image'>

      </section>
      <div id='adding-user-post'>
        <Link to='/add/post'>
          <img src={addingPost} alt="adding post" id="adding"></img>
        </Link>
      </div>

      <section className='card-container'>
        {currentCards.map((item, index) => (
          <div key={index} className='each-card-outer'>
            <Cards
              id={item.id}
              index={index}
              imageUrl={item.image}
              caption={item.caption}
              likes={item.likes}
              hashtags={item.hashtags}
              email={props.email}
              likers={item.likers}
              currentPage={currentPage}
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
            onClick={() => paginate(number)}
            className="btn-pagination"
          >
            {number}
          </button>
        ))}
        {currentPage <
          Math.ceil(props.cards.length / cardsPerPage) - 1 && (
            <button onClick={() => paginate(currentPage + 1)}>{'>>Next'}</button>
          )}
      </div>
    </div>
  );
}

export default Main;