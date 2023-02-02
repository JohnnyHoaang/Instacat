function Form() {
    async function handleSubmit(e) {
        e.preventDefault()
        let username = document.querySelector('#username').value
        let comment = document.querySelector('#comment').value
        // create JSON with username and comment
        let payload = JSON.stringify({
            username: username,
            comment: comment,
        })
        // send post request
        await fetch(`/`, {
            method: "POST",
            body: payload,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        console.log(payload)

    }
    return (
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <input type="text" id="username"></input>
            <br></br>
            <label for="comment">Comment:</label>
            <input type="text" id="comment"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
        </form>
    )
}

export default Form