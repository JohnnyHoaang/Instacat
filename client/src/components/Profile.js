function Profile(props){
    return(
        <div id="profile">
            Username:{props.username}
            <br></br>
            <img src={props.profileURL} width="400" height="400"></img>
        </div>    
    )
}
export default Profile