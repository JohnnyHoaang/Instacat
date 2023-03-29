import React from 'react';
import MainContainer from '../Main/MainContainer'

/**
 * Check the cats which posted by other users
 * @returns {Component} Discover
 * @author Maedeh hassani  
 */
function Discover(props) {

    return (
        <div className="Discover">
            <MainContainer cards={props.cards} setCards={props.setCards}/>
        </div>
    );
}


export default Discover;