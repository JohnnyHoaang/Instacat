import React from 'react';
import heartLike from '../images/heart2.png'


function Cards (props) {

    return (
        <div className='cat-card' >

            <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>

            <div className='caption-heart'>
                <div className='likes'>
                    <img src={heartLike} alt="like" className="heart-like" 
                    onClick={ () => props.handleLike(props.id)}
                     ></img>
                    <span className="LikeNum" id={props.id}>{props.likeNum}</span>
                </div>
                
                <p className='catCaption'>{props.caption}</p>
            </div>
        </div>
    );
}

 
export default Cards;