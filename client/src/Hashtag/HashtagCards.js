import './HashtagCards.css'

/**
 * Page that has information about the website
 * @returns {Component} HashtagCards
 * @author Maedeh hassani
 */
function HashtagCards(props){
    return(
        <div className="cat-hashtag">
            <div className='div-hashtag'>
                <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
            </div>
            <div className='div-hashtag'>
                Searched hashtag:  {props.hash}
            </div>

            <div className='div-hashtag'>
                Username: {props.username}
            </div>
        </div>
    );
}

export default HashtagCards;