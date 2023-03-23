import heartLike from '../images/heart.png'
import shareImg from '../images/share04.png'
import orangeHeart from '../images/orange-heart.png'
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
 * @author Maedeh Hassani  
 */
function Cards(props) {

    const { hashtag } = useParams();
    const { id } = useParams();
    const [numberOfLikes, setNumberOfLikes] = useState(props.likesNum);
    const [increasing, setIncreasing] = useState(true);


    async function handleLike(index, idp) {
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
            let object = JSON.stringify({ id : props.id});
            const url = "/update/post/like/";
            console.log(`${props.id}`);
            await fetch(url, {
                method: "POST",
                body: object,
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                
                },
            });
        }
    }

    function sharePost() {
        navigator.clipboard.writeText(window.location.href);
        alert("Post was copied to clipboard")
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
                    <span className='share-btn' onClick={sharePost}> 
                        <img src={shareImg} alt='share' className='share-img'/>
                    </span>
                </div>
                <p className='catCaption'>{props.caption} {id}</p>
                <div className='cat-hashtags'>
                    <section className='hashtags'>{props.hashtags.map((item, index) => {
                        return <div key={index} >
                                    <Link to={`/catHashtags/${item}`} id={hashtag} style={{ textDecoration: 'none' }}>    
                                    #{item}
                                    </Link>
                               </div>
                    })}
                    </section>
                </div>
            </div>
        </div>

    );
}


export default Cards;