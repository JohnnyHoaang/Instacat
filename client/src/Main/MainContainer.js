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
    // State for cards that will get deleted
    const [state, setState] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    useEffect(() => {
        let url = `/api/cat/all`;
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
    }, [state]);


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
        <div id='main-top-paragraph'>
          Happiness is Cats
        </div>
      </section>
      <div id='adding-user-post'>
        {/* {props.username && */}
          {/* // Links to add post form if logged in */}
          <Link to='/add/post'>
            <img src={addingPost} alt="adding post" id="adding"></img>
          </Link> 
        {/* } */}
      </div>

      <section className='card-container'>
        {currentCards.map((item, index) => (
          <div key={index} className='each-card-outer'>
            <Cards
              isAdmin={props.isAdmin}
              tokens={props.tokens}
              username={props.username}
              post={item}
              index={index}
              email={props.email}
              currentPage={currentPage}
              cards={props.cards}
              state={state}
              setCards={props.setCards}
              setState={setState}
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