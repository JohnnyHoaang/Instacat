import './PostForm.css'
/**
 * Returns a form that adds a comment to a post.
 * @returns {Component} CommentForm
 * @author Bogdan Ivan
 */
function CommentForm(props) {

  /**
   * @param {*} e Event
   * @author Johnny Hoang
   */
  async function onSubmit(e) {
    e.preventDefault()
    const form = document.querySelector("#p-form")
    // Create form data with form input
    const formData = new FormData(form)
    // Add user username & post id
    formData.append('username', props.username)
    formData.append('id', props.id)
    // Upload post to DB
    await fetch(`/comment/post/add`, {
      method: 'POST',
      body: formData
    })
  }

  return (
    <div>
        <form id='p-form' enctype="multipart/form-data" onSubmit={onSubmit}>
            <div className='post-caption'>
                <input type="text" id="caption-input" name="comment"></input>
            </div>
            <div className='submit-post'>
                <input id='submit-btn' type="submit" value="Comment"></input>
            </div>
        </form>
    </div>  
  );
}

export default CommentForm