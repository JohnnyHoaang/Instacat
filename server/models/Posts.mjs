import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: "",
    },
    hashtags: {
        type: Array,
        default: "",
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        username: { type: String },
        comment: { type: String }
    }],
});

const Posts = mongoose.model("Post", PostSchema);

export { Posts }

