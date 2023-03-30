import './HashtagCards.css'

function HashtagCards(props){
    return(
        <div className="cat-hashtag">
            <div>
                <img src={props.imageUrl} alt="catImage" className="each-cat-img"></img>
            </div>
            <div>
                Searched hashtag:  {props.hash}
            </div>

            <div>
                this is the username: {props.username}
            </div>
        </div>
    );
}

export default HashtagCards;