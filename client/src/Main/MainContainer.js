// import catBkg from '../images/catBackgrnd.png';
import Cards from './Crads.js';
import addingPost from '../images/adding-post.png';
import { useEffect, useState } from 'react';
// import url from "https://localhost:3001/catlist";



function Main() {
  
    let [cards, setCards] = useState([])
        //npx json-server --watch data/data.json --port 3001
        useEffect(() => {
            let url = "https://localhost:3001/catlist";
            fetch(url)
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            
            })
            .then(data => {
                console.log(data);
                setCards(data);
                
            })
    });

    

    function like(index){
        //increase the unmber 
    }

    function unlike(index){
        //decrese the unmber 
    }

    return(
        <div className="main-top"> 
            <section id='top-image'>
                hi
                {/* <img src={catBkg} alt="mainCat" id="mainCat"></img> */}
            </section>
            <div id='adding-user-post'>
                <img src={addingPost} alt="adding post" id="adding"></img>
            </div>

            <section className='card-container'>
                    {cards.map((item, index) => (
                        <div key={index} className='each-card-outer'>
                            <Cards id={item.id}
                                index={index}   
                                imageUrl={item.image}
                                like={like}
                                unlike={unlike}/>
                        </div>
                    ))}
            </section>
            
            
        </div>
    );
}

export default Main;










  // const catlist = [
    //     {id: "3cm", url: "https://cdn2.thecatapi.com/images/3cm.jpg"},
    //     {id: "47s", url: "https://cdn2.thecatapi.com/images/47s.jpg"},
    //     {id: "a1p", url: "https://cdn2.thecatapi.com/images/a1p.jpg"},
    //     {id: "2cm", url: "https://cdn2.thecatapi.com/images/2cm.jpg"},
    //     {id: "27s", url: "https://cdn2.thecatapi.com/images/27s.jpg"},
    //     {id: "b1p", url: "https://cdn2.thecatapi.com/images/b1p.jpg"},
    //     {id: "3cn", url: "https://cdn2.thecatapi.com/images/3cn.jpg"},
    //     {id: "46s", url: "https://cdn2.thecatapi.com/images/46s.jpg"},
    //     {id: "c2p", url: "https://cdn2.thecatapi.com/images/c2p.jpg"},
    //     {id: "1cm", url: "https://cdn2.thecatapi.com/images/1cm.jpg"},
    //     {id: "47h", url: "https://cdn2.thecatapi.com/images/47h.jpg"},
    //     {id: "a1p", url: "https://cdn2.thecatapi.com/images/a1p.jpg"},
    // ];