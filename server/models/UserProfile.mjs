import mongoose from 'mongoose'

const UserProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  profileURL: {
    type: String,
    default: "",
  },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export { UserProfile }