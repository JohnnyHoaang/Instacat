import React from 'react';
import heartLike from '../images/heart2.png'
 
function Cards (props) {
    return (
        <div className='cat-card'>

            <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>

            <div className='caption-heart'>
                <div className='likes'>
                    <img src={heartLike} alt="like" className="heart-like"></img>
                    {/* <p>{props.like}</p> */}
                    <span className="LikeNum" id={props.id}>0</span>
                </div>
                
                <p className='catCaption'>{props.caption}</p>
            </div>
            {/* <div className='cat-caption'>{props.catCaption}</div> */}
        </div>
    );
}

 
export default Cards;