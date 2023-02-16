// import catBkg from '../images/catBackgrnd.png';
import Cards from './Crads.js';
import addingPost from '../images/adding-post.png';
import { useEffect, useState } from 'react';


function Main(props) {
  
    let [cards, setCards] = useState([]);
    // let [isLoading, setIsLoading] = useState(true);

    //npx json-server --watch data/data1.json --port 3001  
    useEffect(() => {
        let url = `/api/cat/all`;
        // let url = "http://localhost:3001/catlist"
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
            // setTimeout(() => {
            //     setCards(data);
            //   }, 5000);
            setCards(data);
            // setIsLoading(false);
            
        })
        .catch(err => {
            // setIsLoading(false);
            console.log(err.message);
        })
    }, []);

    return(
        <div className="main-top"> 
            {/* {isLoading && <p> Loading...</p>} */}
            <section id='top-image'>
                
            </section>
            <div id='adding-user-post'>
                <img src={addingPost} alt="adding post" id="adding"></img>
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
                                // handleLike={handleLike}
                                />
                        </div>
                    ))}
            </section>
            
            
        </div>
    );
}

export default Main;
