import Post from "./Post"
import { useState, useEffect } from "react"

function PostSection() {
    const [posts, setPosts] = useState([])

    let allPosts = posts.map(post =>
        <Post username={post.username} comment={post.comment} />
    )

    useEffect(async () => {
        let response = await fetch(`/comment/users`)

        if (response.ok) {
            let result = await response.json()
            setPosts(result)
        }
    }, [])


    return (
        <div>
            {allPosts}
        </div>
    )
}
export default PostSection