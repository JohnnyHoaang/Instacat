import heartLike from '../images/heartt.png'
import orangeHeart from '../images/orange-haert.png'
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
function Cards(props) {

    const { id } = useParams();
    const [numberOfLikes, setNumberOfLikes] = useState(props.likesNum);
    const [increasing, setIncreasing] = useState(true);


    function handleLike(index, idp) {
        const currentLikes = parseInt(document.getElementById(index).innerHTML);

        if (numberOfLikes >= 0) {
            if (increasing) {
                setNumberOfLikes((prevLikes) => prevLikes + 1);
                document.getElementById(idp).src = orangeHeart;
            } else {
                setNumberOfLikes((prevLikes) => prevLikes - 1);
                document.getElementById(idp).src = heartLike;
            }
            setIncreasing(!increasing);
            document.getElementById(index).innerHTML = numberOfLikes;

            // Send the like to the API
            const url = `/api/cat/like/${props.id}`;
            fetch(url, {
                method: "POST",
                body: JSON.stringify({ likes: numberOfLikes }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                // TODO Handle the API response
            }).catch((error) => {
                // Handle the API error
                console.error(error);
            });
        }
    }

    return (
        <div className='cat-card' id={id} >
            <Link to={`/cats/${props.id}`} style={{ textDecoration: 'none' }}>
                <div className='cat-home'>
                    <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
                </div>

            </Link>
            <div className='caption-heart'>
                <div className='likes'>
                    <img src={heartLike} alt="like" className="heart-like"
                        onClick={() => handleLike(props.index, props.id)} id={props.id}>
                    </img>

                    <span className="LikeNum" id={props.index}>{props.likesNum}</span>
                </div>
                <p className='catCaption'>{props.caption} {id}</p>
            </div>
        </div>

    );
}


export default Cards;