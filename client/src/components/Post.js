function Post(props){
    return(
        <div id="post">
            Username:{props.username}
            <br></br>
            Comment:{props.comment}
        </div>    
    )
}

export default Post