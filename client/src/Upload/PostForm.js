import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
/**
 * Returns a form that allows for post upload to database.
 * @returns {Component} PostForm
 * @author Johnny Hoang
 */
function PostForm() {
    return (
        <div>
            <Header />
            <Navigation />
            <div className='post-form'>
                <form method="POST" action="post/upload" enctype="multipart/form-data">
                    <label for="image">Select image:</label>
                    <input type="file" id="image" name="image" accept="image/png, image/jpeg" required></input>
                    <br></br>
                    <label for="caption">Caption:</label>
                    <input type="text" id="caption" name="caption"></input>
                    <br></br>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
            <Footer />
        </div>

    )
}

export default PostForm