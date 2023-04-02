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
  const [likes, setLikes] = useState(props.post.likes)

  async function handleLike() {
    if (props.email !== "") {
      // Like/Dislike post
      await fetch(`like/update`, {
        method: "POST",
        body: JSON.stringify({ email: props.email, id: props.post.id, userToken: props.tokens.user}),
        headers: { "Content-Type": "application/json", },
      });
      // Get new data from API
      fetchData()
    } else {
      alert("Sign up for an account to like posts!")
    }
  }
  /**
   * Fetch data of a single post using id and sets states
   * @author Johnny Hoang
   */
  async function fetchData() {
    let response = await fetch(`api/cat/id/${props.post.id}`);
    if (response.ok) {
      let result = await response.json()
      let post = result[0]
      // Set the number of likes
      setLikes(post.likes)
      // Shows if user liked or not
      checkUserLiked(post.likers)
    }
  }
  /**
   * Check if user has liked or not and sets the change to hook
   * @param {*} likers 
   * @author Johnny Hoang
   */
  function checkUserLiked(likers) {
    let isLike = likers.find(post => post === props.email)
    isLike ? setHeartState(true) : setHeartState(false)
  }

  useEffect(() => {
    // Used to show user's saved likes when user logs in or refreshes
    fetchData()
  }, [props.email, props.currentPage, props.cards])
  
  async function deletePost() {
    let payload
    if (props.isAdmin || props.username === props.post.username) {
      // set correct payload for user or admin
      if(props.isAdmin){
        payload = JSON.stringify({ adminToken: props.tokens.admin, id: props.post.id })
      } else {
        payload = JSON.stringify({ userToken: props.tokens.user, id: props.post.id })
      }
      const headers = {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      };
      await fetch(`/delete/post`, headers)
      let index = props.cards.findIndex(card => card.id === props.post.id)
      props.cards.splice(index, 1)
      props.setCards(props.cards)
      // change state when deleted
      props.setState(!props.state)
      alert("Successfully deleted post!")
    }
  }

  /***
    * @author Maedeh hassani 
  */

  function sharePost() {
    navigator.clipboard.writeText(`${window.location.href}cats/${props.post.id}`);
    alert("Post was copied to clipboard")
  }

  return (
    <div className='cat-card' id={id} >
      <Link to={`/cats/${props.post.id}`} style={{ textDecoration: 'none' }}>
        <div className='cat-home'>
          <img src={props.post.image} alt="catImage" className="each-cat-img"></img>
          </div>

      </Link>
      <div className='caption-heart'>
        <div className='likes'>
          {/* Change the state of the heart icon depending on state */}
          <img src={heartState ? orangeHeart : heartLike} alt="like" className="heart-like"
            onClick={handleLike} id={props.post.id}>
          </img>

          <span className="LikeNum" id={props.index}>{likes}</span>
          <span className='share-btn' onClick={() => { sharePost() }}>
            <img src={shareImg} alt='share' className='share-img' />
          </span>
          {(props.isAdmin || props.username === props.post.username) && <button onClick={deletePost}>Delete</button>}
        </div>
        <p className='catCaption'>{props.post.caption} {id}</p>
        <div className='cat-hashtags'>
          <section className='hashtags'>{props.post.hashtags.map((item, index) => {
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