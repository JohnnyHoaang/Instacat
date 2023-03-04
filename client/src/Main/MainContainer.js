import Cards from './Crads.js';
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
        }
        
        })
        .then(data => {
            console.log(data);
            setCards(data);
            
        })
        .catch(err => {
            console.log(err.message);
        })
    }, []);

    return(
        <div className="main-top"> 
            <section id='top-image'>
                
            </section>
            <div id='adding-user-post'>
            {/* <img src={addingPost} alt="adding post" id="adding"></img> */}
            <a href='add/post'><img src={addingPost} alt="adding post" id="adding"></img></a>
            </div>

            <section className='card-container'>
                    {cards.map((item, index) => ( 
                        <div key={index} className='each-card-outer'>
                        <Cards 
                            id={item.id}
                            index={index}   
                            imageUrl={item.image}
                            caption={item.caption}
                            likesNum={item.likes}
                        />
                        </div>
                    ))}
            </section>
            
            
        </div>
    );
}

export default Main;
