function EditPostForm(props) {

    async function onSubmit(e) {
        e.preventDefault()
        const form = document.querySelector("#p-form")
        // Create form data with form input
        const formData = new FormData(form)
        // Add user email
        formData.append('email', props.email)
        await fetch(`/edit/profile/update`, {
            method: 'POST',
            body: formData
        })
        alert("Profile updated Successfully!")
    }

    return (
        <div>
            <div className='post-form'>
                <form id='p-form' onSubmit={onSubmit}>
                    <h2>Edit Profile Information:</h2>
                    <div className='post-image'>
                        <label className='image-lable' for="image">Select image:</label>
                        <input type="file" id="image-post-btn" name="image" accept="image/png, image/jpeg"></input>
                    </div>
                    <div className='post-username'>
                        <label id='caption-label' for="caption">Username:</label>
                        <input type="text" id="username-input" name="username"></input>
                    </div>
                    <div className='submit-post'>
                        <input id='submit-btn' type="submit" value="Save"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditPostForm 