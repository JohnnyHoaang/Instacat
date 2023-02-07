function Profile(props){
    return(
        <div id="profile">
            Username:{props.username}
            <br></br>
            <img src={props.profileURL}></img>
        </div>    
    )
}
export default Profile