

function HashtagCards(props){
    return(
        <div>
            <div>
                <img src={props.imageUrl} alt="catImage" className="hashtag-cat-img"></img>
            </div>
            <div>
                this is the id: {props.id}
            </div>

            <div>
                this is the username: {props.username}
            </div>
        </div>
    );
}

export default HashtagCards;