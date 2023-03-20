import './PostForm.css'
/**
 * Returns a form that allows for post upload to database.
 * @returns {Component} PostForm
 * @author Johnny Hoang
 */
function PostForm() {
    return (
        <div>
            <div className='post-form'>
                <form id='p-form' method="POST" action="/add/post/upload" enctype="multipart/form-data">
                    <div className='post-image'>
                        <label className='image-lable' for="image">Select image:</label>
                        <input type="file" id="image-post-btn" name="image" accept="image/png, image/jpeg" required></input>
                    </div>
                    <div className='post-caption'>
                        <label id='caption-label' for="caption">Caption:</label>
                        <input type="text" id="caption-input" name="caption"></input>
                    </div>
                    <div className='submit-post'>
                    <input id='submit-btn' type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default PostForm