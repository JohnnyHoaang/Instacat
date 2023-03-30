import { useEffect } from 'react';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import HashtagCards from './HashtagCards.js'
import './SameHashtag.css'

/**
 * creating the template for cat hashtag,
 * so when user click on hashtag teh code returns all the posts 
 * with the same hashtag 
 * 
 * @param {*} props 
 * @returns {Component} SameHashtag
 * @author Maedeh hassani  
 */
function SameHashtag () {
    const { hashtag } = useParams();
    let [eachHashtag, setEachHashtag]= useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    //npx json-server --watch data/data2.json --port 3006  
    useEffect(() => {
        let url = `/api/hashtag/${hashtag}`;
        // let url = 'http://localhost:3006/subvicar'
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fetching issue', response.Error);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                setEachHashtag(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    

    // Calculate the starting and ending index of the cards to display
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = eachHashtag.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(Math.ceil(eachHashtag.length / cardsPerPage), currentPage + 1);
        i++
    ) {
        pageNumbers.push(i);
    }

    return(
        <div>  
            <section className='card-container'>
                {currentCards.map((item, index) => ( 
                    <div key={index} className='each-card-outer'>
                        <HashtagCards 
                            hash = {hashtag}
                            id={item.id}
                            index={index}   
                            username={item.username}
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
                        className="btn-pagination"
                    >
                        {number}
                    </button>
                ))}
                {currentPage <
                    Math.ceil(eachHashtag.length / cardsPerPage) - 1 && (
                        <button onClick={() => paginate(currentPage + 1)}>{'>>Next'}</button>
                    )}
            </div>

        </div>
    )
}

export default SameHashtag;