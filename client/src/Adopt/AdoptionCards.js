import React from "react";



function AdoptionCards(props) {


    return (
        <div className='cat-adopt' >
            <p>{props.index}</p>
            <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
            <div className="btn-adopt">
                <button className="adopt-btn" type="button" onClick={() => props.deleting(props.index)}>
                    Adopt
                </button>
            </div>

        </div>
    );

}

export default AdoptionCards;