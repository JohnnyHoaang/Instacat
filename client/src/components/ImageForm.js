function ImageForm(){
    return(
        <form method="POST" action="profile/upload" enctype="multipart/form-data">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"></input>
            <br></br>
            <label for="image">Select image:</label>
            <input type="file"id="image" name="image" accept="image/png, image/jpeg"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
        </form>
    )
}

export default ImageForm