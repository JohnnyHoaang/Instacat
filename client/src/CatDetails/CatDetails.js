import { useEffect } from 'react';
import './CatDetails.css';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

/***
 * Display each cat information 
 * @returns {Component} CatDetails
 * @author Maedeh hassani 
 */
function CatDetails (props) { 
    const { id } = useParams();

    const [formState, setFormState] = useState(false)

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
        let url = `/api/cat/id/${id}`;
        // let url = 'http://localhost:3003/0'

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
    }, [formState]);

    /**
   * @param {*} e Event
   * @author Johnny Hoang
   */
  async function onSubmit(e) {
    e.preventDefault()
    const form = document.querySelector("#p-form")
    // Create form data with form input
    const formData = new FormData(form)
    // Add user username & post id
    formData.append('username', props.username)
    formData.append('id', id)
    // Upload post to DB
    await fetch(`/comment/post/add`, {
      method: 'POST',
      body: formData
    })
    setFormState(!formState)
  }

    return (
        
        <div className="CatDetails">
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
                                <section className='caption'>{eachCat.caption}</section>
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
                            <div>
                                <form id='p-form' enctype="multipart/form-data" onSubmit={onSubmit}>
                                    <div className='post-caption'>
                                        <input type="text" id="caption-input" name="comment"></input>
                                    </div>
                                    <div className='submit-post'>
                                        <input id='submit-btn' type="submit" value="Comment"></input>
                                    </div>
                                </form>
                            </div>      
                        </div>
                    </div>
                </div>
            )}
        </div>
        

    );
}

 
export default CatDetails;