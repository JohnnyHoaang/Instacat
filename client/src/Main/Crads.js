import heartLike from '../images/heart2.png'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Cards.css';
import React, { useState } from 'react';


/**
 * creating the template for cat post in home page,
 * and like function that use can like the post 
 * 
 * @param {*} props 
  * @returns {Component} Cards
 * @author Maedeh hassani  
 */
function Cards (props) {

    const { id } = useParams();
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
                    onClick={ () => handleLike(props.index)}>
                    </img>

                    <span className="LikeNum" id={props.index}>{props.likesNum}</span>
                </div>
                <p className='catCaption'>{props.caption} {id}</p>
            </div>
        </div>

    );
}

 
export default Cards;