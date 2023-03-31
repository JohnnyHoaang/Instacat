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
    if (props.email !== "") {
      // Like/Dislike post
      await fetch(`like/update`, {
        method: "POST",
        body: JSON.stringify({ email: props.email, id: props.id }),
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
  async function fetchData(){
    let response = await fetch(`api/cat/id/${props.id}`);
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
  function checkUserLiked(likers){
    let isLike = likers.find(post => post === props.email)
    isLike ? setHeartState(true) : setHeartState(false)
  }

    function deletePost(){
        if(props.isAdmin){
            let payload = JSON.stringify({ token: props.token, id: props.id})
            const headers = {
                method: "POST",
                body: payload,
                headers: {
                  "Content-Type": "application/json; charset=UTF-8",
                }
              };
            fetch(`/delete/post`, headers)
            let index = props.cards.findIndex(card=> card.id === props.id)
            props.cards.splice(index,1)
            props.setCards(props.cards)
            // change state when deleted
            props.setState(!props.state)
            alert("Successfully deleted post!")
        }
    }

  function sharePost() {
    navigator.clipboard.writeText(`${window.location.href}cats/${props.id}`);
    alert("Post was copied to clipboard")
  }
  
  useEffect(() => {
    // Used to show user's saved likes when user logs in or refreshes
    fetchData()
  }, [likers, props.email, props.currentPage])

  

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
          <span className='share-btn' onClick={() => { sharePost() }}>
          {(props.isAdmin || props.username === props.postUsername) && <button onClick={deletePost}>Delete</button>}
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


