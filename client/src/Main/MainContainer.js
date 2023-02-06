import catBkg from '../images/catBackgrnd.png';
import Cards from './Crads.js'
import addingPost from '../images/adding-post.png'
import { useState } from 'react';


function Main() {
    const catlist = [
        {id: "3cm", url: "https://cdn2.thecatapi.com/images/3cm.jpg", width: 612, height: 612},
        {id: "47s", url: "https://cdn2.thecatapi.com/images/47s.jpg", width: 500, height: 331},
        {id: "a1p", url: "https://cdn2.thecatapi.com/images/a1p.jpg", width: 560, height: 432},
        {id: "2cm", url: "https://cdn2.thecatapi.com/images/2cm.jpg", width: 612, height: 612},
        {id: "27s", url: "https://cdn2.thecatapi.com/images/27s.jpg", width: 500, height: 331},
        {id: "b1p", url: "https://cdn2.thecatapi.com/images/b1p.jpg", width: 560, height: 432},
        {id: "3cn", url: "https://cdn2.thecatapi.com/images/3cn.jpg", width: 612, height: 612},
        {id: "46s", url: "https://cdn2.thecatapi.com/images/46s.jpg", width: 500, height: 331},
        {id: "c2p", url: "https://cdn2.thecatapi.com/images/c2p.jpg", width: 560, height: 432},
        {id: "1cm", url: "https://cdn2.thecatapi.com/images/1cm.jpg", width: 612, height: 612},
        {id: "47h", url: "https://cdn2.thecatapi.com/images/47h.jpg", width: 500, height: 331},
        {id: "a1p", url: "https://cdn2.thecatapi.com/images/a1p.jpg", width: 560, height: 432},
        // {id:"", },
        // {id:"", },
        // {id:"", }
    ];

    let [cards, setCards] = useState(catlist)

    function like(index){
        //increase the unmber 
    }

    function unlike(index){
        //decrese the unmber 
    }

    return(
        <div className="main-top"> 
            <section>
                <img src={catBkg} alt="mainCat" id="mainCat"></img>
            </section>
            <div id='adding-user-post'>
                <img src={addingPost} alt="adding post" id="adding"></img>
            </div>

            <section className='card-container'>
                    {cards.map((item, index) => (
                        <div key={index} className='each-card-outer'>
                            <Cards id={item.id}
                                index={index}   
                                imageUrl={item.url}
                                like={like}
                                unlike={unlike}
                                width={item.width}
                                heigh={item.height}/>
                        </div>
                    ))}
            </section>
            
            
        </div>
    );
}

export default Main;