// import heartLike from '../images/heart2.png'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './CatDetails.css';
import React, { useState } from 'react';
// import cs from "classnames";

// BDb8ZXb1v
function CatDetails ({id}) { 
    // const { id } = useParams();
    let [eachCat, setEachCat] = useState([]);
    // const [numberOfLikes, setNumberOfLikes] = useState(likesNum);
    // const [increasing, setIncreasing] = useState(true);


    useEffect(() => {
        let url = `/api/cat/id/${id}`;
        console.log(url);
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
            setEachCat(data);
            
        })
        .catch(err => {
            console.log(err.message);
        })
    }, [id]);


    return (
        
        <div className="CatDetails">
            <Header />
            <div className='cat-detail' id={id} >
                <div className="specific-cat">
                    <div className="specific-catImg">
                        <img src={eachCat.image} alt="specific-cat-img" ></img>
                    </div>
                    <div className='cat-info'>
                        <div>User name: {eachCat.username}</div>
                        <div className='likes-detail'>
                            {/* <img src={heartLike} alt="like" className="heart-like" ></img> */}
                            <span className="cat-like" >Like: {eachCat.likesNum}</span>
                        </div>                   
                        <p className='Caption-detail'>Caption: {eachCat.caption} {id}</p>
                        <p className='Caption-detail'>Hashtag(s): {eachCat.caption} {id}</p>
                        <p className='Caption-detail'>Comments(s): {eachCat.caption} {id}</p>
                    </div>
                </div>
            </div>
                
             <Footer />
        </div>
        

    );
}

 
export default CatDetails;


