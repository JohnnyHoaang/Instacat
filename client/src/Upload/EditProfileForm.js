/**
 * Form that allows users to edit their profile
 * @param {Object} props 
 * @returns {Component}
 * @author Johnny Hoang
 */
function EditPostForm(props) {
    /**
     * Submit handler for the form and send a request to update route
     * @param {Event} e 
     */
    async function onSubmit(e) {
        e.preventDefault()
        const form = document.querySelector("#p-form")
        // Create form data with form input
        const formData = new FormData(form)
        // Add user email
        formData.append('email', props.email)
        formData.append('userToken', props.tokens.user)
        console.log(formData)
        let result
        // Update profile information
        let response = await fetch(`/edit/profile/update`, {
            method: 'POST',
            body: formData
        })
        // Gets updated data returned from request
        if (response.ok) {
            result = response.json()
        }
        // Set new name of user
        props.setUsername(result.name)
        alert("Profile updated Successfully!")
    }

    return (
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
    )
}
export default EditPostForm 