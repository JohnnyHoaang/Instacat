import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'

async function onSubmit(e) {
    e.preventDefault()
    const form = document.querySelector("#p-form")
    const formData = new FormData(form)
    formData.append('email', "jhoangbt@gmail.com")
    await fetch(`/edit/profile/update`, {
        method: 'POST',
        body: formData
    })
}
function EditPostForm() {
    return (
        <div>
            <div className='post-form'>
                <form id='p-form' onSubmit={onSubmit}>
                    <h2>Edit Profile Information:</h2>
                    <div className='post-image'>
                        <label className='image-lable' for="image">Select image:</label>
                        <input type="file" id="image-post-btn" name="image" accept="image/png, image/jpeg" required></input>
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