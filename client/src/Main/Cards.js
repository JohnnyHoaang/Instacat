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
  const [heartState, setHeartState] = useState(false)
  const [likers, setLikers] = useState(props.likers)
  const [likes, setLikes] = useState(props.likes)

  async function handleLike() {
    if (props.username !== "") {
      // Like/Dislike post
      await fetch(`like/update`, {
        method: "POST",
        body: JSON.stringify({ username: props.username, id: props.id }),
        headers: { "Content-Type": "application/json", },
      });
      // Get new data from API
      let response = await fetch(`api/cat/id/${props.id}`);
      if (response.ok) {
        let result = await response.json()
        let post = result[0]
        // Set the number of likes
        setLikes(post.likes)
        // Shows if user liked or not
        checkUserLiked(post.likers)
      }
    } else {
      alert("Sign up for an account to like posts!")
    }
  }
  /**
   * Check if user has liked or not and sets the change to hook
   * @param {*} likers 
   */
  function checkUserLiked(likers){
    let isLike = likers.find(post => post === props.username)
    isLike ? setHeartState(true) : setHeartState(false)
  }
  useEffect(() => {
    // Used to show user's saved likes when user logs in or refreshes
    checkUserLiked(likers)
  }, [likers, props.username])

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
          {/* Change the state of the heart icon depending on state */}
          <img src={heartState ? orangeHeart : heartLike} alt="like" className="heart-like"
            onClick={handleLike} id={props.id}>
          </img>

          <span className="LikeNum" id={props.index}>{likes}</span>
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


