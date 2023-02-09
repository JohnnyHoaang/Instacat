import mongoose from 'mongoose'

const UserCommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: "",
  },
});

const UserComment = mongoose.model("UserComment", UserCommentSchema);

export { UserComment }