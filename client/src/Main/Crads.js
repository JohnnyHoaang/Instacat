import heartLike from '../images/heart2.png'
// import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Cards.css';
import React, { useState } from 'react';
// import CatDetails from '../CatDetails/CatDetails';

// BDb8ZXb1v
function Cards (props) {

    const { id } = useParams();
    // let [eachCat, setEachCat] = useState([]);
    const [numberOfLikes, setNumberOfLikes] = useState(props.likesNum);
    const [increasing, setIncreasing] = useState(true);


    function handleLike(idp){
        const currentLikes = parseInt(document.getElementById(idp).innerHTML);
        
      
        if (numberOfLikes >= 0) {
          if (increasing) {
            setNumberOfLikes(numberOfLikes + 1);
          } else {
            setNumberOfLikes(numberOfLikes - 1);
          }
          setIncreasing(!increasing);
          document.getElementById(idp).innerHTML = numberOfLikes;
        }
      }

    return (

        <div className='cat-card' id={id} >
            <Link to={`/cats/${props.id}`} style={{ textDecoration: 'none' }}>
                <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
            </Link>
                
            <div className='caption-heart'>
                <div className='likes'>
                

                    <img src={heartLike} alt="like" className="heart-like" 
                    // onClick={ () => props.handleLike(props.index)}
                    onClick={ () => handleLike(props.index)}

                    ></img>
                
                    <span className="LikeNum" id={props.index}>{props.likesNum}</span>
                </div>
                
                <p className='catCaption'>{props.caption} {id}</p>
                {/* <p >{eachCat.caption}</p> */}

            </div>
            {/* <CatDetails id={props.id} /> */}
        </div>

    );
}

 
export default Cards;









