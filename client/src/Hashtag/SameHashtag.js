import { useEffect } from 'react';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";


function SameHashtag () {
    const { hashtag } = useParams();
    let [eachHashtag, setEachHashtag]= useState({});

    //npx json-server --watch data/data2.json --port 3006  
    useEffect(() => {
        let url = `/api/hashtag/${hashtag}`;
        // let url = 'http://localhost:3002/cats'

        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fetching issue', response.Error);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                setEachHashtag(data[0]);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    return(
        <div>  
            <p>
                test for hastags
            </p>
            <div>
                this is the id: {eachHashtag.id}
                
            </div>

            <div>
                this is the image: {eachHashtag.image}
            </div>
        </div>

    )
}

export default SameHashtag;