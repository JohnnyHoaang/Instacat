import Cards from './Cards.js';
import './MainContainer.css';
import addingPost from '../images/adding-post.png';
import { useEffect, useState } from 'react';



/**
 * fetch all the cats information from api
 * and map through the list to creat each cat post 
 * @param {*} props 
 * @returns {Component} Main
 * @author Maedeh hassani 
 */
function Main(props) {
    
    let [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    //npx json-server --watch data/data1.json --port 3002  
    useEffect(() => {
        // let url = `/api/cat/all`;
        let url = "http://localhost:3002/catlist"
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fetching issue', response.Error);
                } else {
                    return response.json();
                }})
            .then(data => {
                setCards(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);


    // Calculate the starting and ending index of the cards to display
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(Math.ceil(cards.length / cardsPerPage), currentPage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }

    return(
        <div className="main-top"> 
            <section id='top-image'>
                
            </section>
            <div id='adding-user-post'>
                <a href='add/post'>
                    <img src={addingPost} alt="adding post" id="adding"></img>
                </a>
            </div>

            <section className='card-container'>
                    {currentCards.map((item, index) => ( 
                        <div key={index} className='each-card-outer'>
                        <Cards 
                            id={item.id}
                            index={index}   
                            imageUrl={item.image}
                            caption={item.caption}
                            likesNum={item.likes}
                            hashtags={item.hashtags}
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
                Math.ceil(cards.length / cardsPerPage) - 1 && (
                <button onClick={() => paginate(currentPage + 1)}>{'>>Next'}</button>
                )}
            </div>
        </div>
    );
}

export default Main;