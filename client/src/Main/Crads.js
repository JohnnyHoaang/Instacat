import React from 'react';
import heartLike from '../images/heartt.png'
 
function Cards (props) {
    return (
        <div className='cat-card'>

                <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>

            <div className='caption-heart'>
                {/* <p> heart image</p> */}
                <img src={heartLike} alt="like" className="heart-like"></img>

                <p>caption part to click</p>
            </div>
            <div className='cat-caption'>{props.catCaption}</div>
        </div>
    );
}

 
export default Cards;