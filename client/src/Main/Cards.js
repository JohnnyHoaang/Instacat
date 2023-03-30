import heartLike from '../images/heart.png'
import shareImg from '../images/share04.png'
import orangeHeart from '../images/orange-heart.png'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Cards.css';
import React, { useEffect, useState } from 'react';

/**
 * creating the template for cat post in home page,
 * and like function that use can like the post 
 * 
 * @param {*} props 
 * @returns {Component} Cards
 * @author Maedeh hassani  
 */
function Cards(props) {

  const { hashtag } = useParams();
  const { id } = useParams();
  const [changeHeart, setChangeHeart] = useState(false)

  async function handleLike() {
    fetch(`like/update`, {
      method: "POST",
      body: JSON.stringify({ username: props.username, id: props.id }),
      headers: { "Content-Type": "application/json", },
    });
    props.setState(!props.state)
  }

  function sharePost() {
    navigator.clipboard.writeText(`${window.location.href}cats/${props.id}`);
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
            onClick={handleLike} id={props.id}>
          </img>

          <span className="LikeNum" id={props.index}>{props.likesNum}</span>
          <span className='share-btn' onClick={() => { sharePost(props.id) }}>
            <img src={shareImg} alt='share' className='share-img' />
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


