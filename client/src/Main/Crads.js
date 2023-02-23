import heartLike from '../images/heart2.png'
import { useState } from 'react';
import { useParams } from "react-router-dom";

// BDb8ZXb1v
function Cards (props) {
    let [numberOfLikes, setNumberOfLikes] = useState (props.likesNum);
    let increasing = true; 
    const { id } = useParams();

    

    function handleLike(idp){
        // console.log(numberOfLikes);
        setNumberOfLikes (parseInt(document.getElementById(idp).innerHTML));

        if(numberOfLikes >= 0){

            if (increasing){
                increasing = false;
                setNumberOfLikes (numberOfLikes + 1);
                console.log('increasing');
                let likes = JSON.stringify( {numberOfLikes : numberOfLikes});

                fetch(`/cat/id/id:${props.id}` , {
                    method :"POST",
                    body: likes, 
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });

                // fetch()
                // fetch from api ==> for decreasing same id



                document.getElementById(idp).innerHTML = numberOfLikes;
                
     
             } else if (increasing === false){
                increasing = true;
                setNumberOfLikes (numberOfLikes - 1 );   
                console.log('decreasing'); 
                document.getElementById(idp).innerHTML = numberOfLikes;
                
             }
        }            
    }

    return (
        <div className='cat-card' id={props.id}>

            <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>

            <div className='caption-heart'>
                <div className='likes'>
                    <img src={heartLike} alt="like" className="heart-like" 
                    // onClick={ () => props.handleLike(props.index)}
                    onClick={ () => handleLike(props.index)}

                     ></img>
                    <span className="LikeNum" id={props.index}>{props.likesNum}</span>
                </div>
                
                <p className='catCaption'>{props.caption}</p>
            </div>
        </div>
    );
}

 
export default Cards;