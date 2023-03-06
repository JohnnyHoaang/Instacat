import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './CatDetails.css';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";


/***
 * Display each cat inormation 
 * @returns {Component} CatDetails
 * @author Maedeh hassani 
 */
function CatDetails () { 
    const { id } = useParams();
    let [eachCat, setEachCat] = useState({
        _id: '',
        id: '',
        username: '',
        image: '',
        caption: '',
        hashtags: [],
        likes: 0,
        comments: [],
      });


    //npx json-server --watch data/data2.json --port 3003  
    useEffect(() => {
        // let url = `http://localhost:3000/api/cat/id/${id}`;
        let url = 'http://localhost:3003/0'

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
            setEachCat(data[0]);
            
        })
        .catch(err => {
            console.log(err.message);
        })
    }, []);


    return (
        
        <div className="CatDetails">
            <Header />
            {eachCat && (
                <div className='cat-detail' id={id} >
                    <div className="specific-cat">
                        <div className="specific-catImg">
                            <img src={eachCat.image} alt="specific-cat-img" ></img>
                        </div>
                        <div className='cat-info'>
                            <div className='username'>
                                User name:
                                <section className='user'>{eachCat.username}</section>
                            </div>

                            <div className='likes-info'>
                                Like: 
                                <section className="likes"> {eachCat.likes}</section>
                            </div> 

                            <div className='caption-info'>
                                Caption: 
                                <section className='caption'>{eachCat.caption}{id}</section>
                            </div>

                            <div className='hashtag-info'>
                                Hashtag(s):
                                <section className='hashtags'>{eachCat.hashtags.map((item, index) => {
                                    return <div key={index}>#{item}</div>
                                })}
                                </section>

                            </div>

                            <div className='comment-info'>
                                Comment(s):
                                <section className='comments'>{eachCat.comments.map((item, index) =>{
                                    return <div key={index}>{item.username}: {item.comment}</div>
                                })}
                                </section>
                            </div>        
                        </div>
                    </div>
                </div>
            )}
             <Footer />
        </div>
        

    );
}

 
export default CatDetails;