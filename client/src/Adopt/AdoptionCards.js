import React from "react";



function AdoptionCards(props){

    
    return(
        <div className='cat-adpt' >
            <p>{props.index}</p>
            <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
            <div className="btn-adp">
                <button className="adopt-btn" type="button" onClick={ () => props.deleting(props.index)}>
                Adopt
                </button>
            </div>
            
        </div>
    );

}

export default AdoptionCards;