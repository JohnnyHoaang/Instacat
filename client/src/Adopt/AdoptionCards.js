import React from "react";


function AdoptionCards(props) {

    return (
        <div className='cat-adopt' >
            <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
            <div className="cat-adopt-info">
                <p>Name: <b>{props.name}</b></p>
                <p>Gender: <b>{props.gender}</b></p>
            </div>
            
            <div className="btn-adopt">
                <button className="adopt-btn" type="button" onClick={() => props.deleting(props.url)}>
                    Adopt
                </button>
            </div>
            
        </div>
    );

}

export default AdoptionCards;