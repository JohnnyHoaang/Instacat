function ImageForm(){
    async function handleSubmit(e){
        e.preventDefault()
        let input = document.querySelector("#image")
        let file = input.files[0]
        // convert file to blob
        file.arrayBuffer().then((arrayBuffer) => {
            const blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
            console.log(blob);
        });
        // send blob to db
    }
    return(
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <input type="text" id="username"></input>
            <br></br>
            <label for="image">Select image:</label>
            <input type="file"id="image" name="image" accept="image/png, image/jpeg"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
        </form>
    )
}

export default ImageForm