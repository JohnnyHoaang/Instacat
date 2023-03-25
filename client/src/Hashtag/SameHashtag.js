import { useEffect } from 'react';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import HashtagCards from './HashtagCards.js'
import './SameHashtag.css'

/**
 * creating the template for cat hashtag,
 * so when user click on hashtag teh code returns all the posts 
 * with the same hashtag 
 * 
 * @param {*} props 
 * @returns {Component} SameHashtag
 * @author Maedeh hassani  
 */
function SameHashtag () {
    const { hashtag } = useParams();
    let [eachHashtag, setEachHashtag]= useState([]);

    //npx json-server --watch data/data2.json --port 3006  
    useEffect(() => {
        // let url = `/api/hashtag/${hashtag}`;
        let url = 'http://localhost:3006/subvicar'
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fetching issue', response.Error);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                setEachHashtag(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    return(
        <div>  
            <section className='card-container'>
                {eachHashtag.map((item, index) => ( 
                    <div key={index} className='each-card-outer'>
                        <HashtagCards 
                            hash = {hashtag}
                            id={item.id}
                            index={index}   
                            username={item.username}
                            imageUrl={item.image}
                            caption={item.caption}
                            likesNum={item.likes}
                            hashtags={item.hashtags}
                        />
                    </div>
                ))}
            </section>
        </div>
    )
}

export default SameHashtag;