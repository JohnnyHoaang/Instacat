import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'

function EditPostForm() {
    return (
        <div>
            <Header />
            <Navigation />
            <div className='post-form'>
                <form id='p-form' method="POST" action="/edit/profile/update" enctype="multipart/form-data">
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
            <Footer />
        </div>
    )
}
export default EditPostForm 