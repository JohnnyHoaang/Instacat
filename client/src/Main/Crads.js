import React from 'react';
import heartLike from '../images/heart2.png'

BDb8ZXb1v
function Cards (props) {

    return (
        <div className='cat-card' id={props.id}>

            <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>

            <div className='caption-heart'>
                <div className='likes'>
                    <img src={heartLike} alt="like" className="heart-like" 
                    onClick={ () => props.handleLike(props.index)}
                     ></img>
                    <span className="LikeNum" id={props.index}>{props.likeNum}</span>
                </div>
                
                <p className='catCaption'>{props.caption}</p>
            </div>
        </div>
    );
}

 
export default Cards;