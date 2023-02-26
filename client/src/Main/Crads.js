import heartLike from '../images/heart2.png'
// import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Cards.css';
import { useEffect } from 'react';
import React, { useState } from 'react';
// import cs from "classnames";

// BDb8ZXb1v
function Cards (props) {
    // let [numberOfLikes, setNumberOfLikes] = useState (props.likesNum);
    // let increasing = true; 
    const { id } = useParams();
    // let [eachCat, setEachCat] = useState([]);
    const [numberOfLikes, setNumberOfLikes] = useState(props.likesNum);
    const [increasing, setIncreasing] = useState(true);


    function handleLike(idp){
        const currentLikes = parseInt(document.getElementById(idp).innerHTML);
        
      
        if (numberOfLikes >= 0) {
          if (increasing) {
            setNumberOfLikes(numberOfLikes + 1);
          } else {
            setNumberOfLikes(numberOfLikes - 1);
          }
          setIncreasing(!increasing);
          document.getElementById(idp).innerHTML = numberOfLikes;
        }
      }

    return (

        <div className='cat-card' id={id} >
            <Link to={`/cats/${props.id}`} style={{ textDecoration: 'none' }}>
                <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
            </Link>
                
            <div className='caption-heart'>
                <div className='likes'>
                

                    <img src={heartLike} alt="like" className="heart-like" 
                    // onClick={ () => props.handleLike(props.index)}
                    onClick={ () => handleLike(props.index)}

                    ></img>
                
                    <span className="LikeNum" id={props.index}>{props.likesNum}</span>
                </div>
                
                <p className='catCaption'>{props.caption} {id}</p>
                {/* <p >{eachCat.caption}</p> */}

            </div>
        </div>

    );
}

 
export default Cards;

//to post and get the new number of like

// function LikeButton({ idp, initialLikes }) {
//     const [numberOfLikes, setNumberOfLikes] = useState(initialLikes);
//     const [increasing, setIncreasing] = useState(true);
  
//     const handleLikeClick = async () => {
//       try {
//         let newLikes;
//         if (increasing) {
//           newLikes = numberOfLikes + 1;
//         } else {
//           newLikes = numberOfLikes - 1;
//         }
  
//         const response = await fetch(`https://your-api.com/likes/${idp}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ likes: newLikes }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to update likes on server');
//         }
  
//         setNumberOfLikes(newLikes);
//         setIncreasing(!increasing);
//       } catch (error) {
//         console.error(error);
//       }
//     };






// function handleLike(idp){
//     // console.log(numberOfLikes);
//     setNumberOfLikes (parseInt(document.getElementById(idp).innerHTML));

//     if(numberOfLikes >= 0){

//         if (increasing){
//             increasing = false;
//             setNumberOfLikes (numberOfLikes + 1);
//             console.log('increasing');
//             console.log(numberOfLikes);
//             // let likes = JSON.stringify( {numberOfLikes : numberOfLikes});

//             // fetch(`/cat/id/id:${props.id}` , {
//             //     method :"POST",
//             //     body: likes, 
//             //     headers: {
//             //         "Content-type": "application/json; charset=UTF-8"
//             //     }
//             // });
//             // fetch()
//             // fetch from api ==> for decreasing same id

//             document.getElementById(idp).innerHTML = numberOfLikes;
//             setNumberOfLikes = numberOfLikes;
    
//          } else if (increasing === false){
//             increasing = true;
//             setNumberOfLikes (numberOfLikes - 1 );   
//             console.log('decreasing'); 
//             console.log(numberOfLikes);
//             document.getElementById(idp).innerHTML = numberOfLikes;
//             setNumberOfLikes = numberOfLikes;
//          }
//     }            
// }