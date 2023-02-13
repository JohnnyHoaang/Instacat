// import catBkg from '../images/catBackgrnd.png';
import Cards from './Crads.js';
import addingPost from '../images/adding-post.png';
import { useEffect, useState } from 'react';


function Main() {
  
    let [cards, setCards] = useState([]);
    let [numberOfLikes, setNumberOfLikes] = useState (0);
    // let [isLoading, setIsLoading] = useState(true);


    //npx json-server --watch data/data1.json --port 3001  
    useEffect(() => {
        let url = `/api/cat/all`;
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
            // setIsLoading(false);
            
        })
        .catch(err => {
            // setIsLoading(false);
            console.log(err.message);
        })
    }, []);

    

    function handleLike(id){
        //increase the unmber 
        numberOfLikes = document.getElementById(id).innerHTML;
        document.getElementById(id).innerText = null
        parseInt(numberOfLikes)
        setNumberOfLikes (numberOfLikes++ );    
        document.getElementById(id).innerHTML = numberOfLikes;    
    }

    return(
        <div className="main-top"> 
            {/* {isLoading && <p> Loading...</p>} */}
            <section id='top-image'>
                {/* <img src={catBkg} alt="mainCat" id="mainCat"></img> */}
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
                                likeNum={item.likes}
                                handleLike={handleLike}/>
                        </div>
                    ))}
            </section>
            
            
        </div>
    );
}

export default Main;
