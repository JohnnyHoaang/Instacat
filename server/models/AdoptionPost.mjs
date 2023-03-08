import mongoose from 'mongoose'

const AdoptionPostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: "",
    },
    size: {
        type: String,
        default: "",
    },
    coat: {
        type: String,
        default: "",
    },
    tags: {
        type: Array,
        default: [],
    },
    name: {
        type: String,
        default: "",
    },
    primary_photo_cropped: {
        small: {
            type: String
        },
        medium: {
            type: String,
            default: ""
        },
        large: {
            type: String,
            default: ""
        },
        full: {
            type: String,
            default: ""
        }
    },
    status: {
        type: String,
        default: "adoptable"
    }
});

const AdoptionPost = mongoose.model("AdoptionPost", AdoptionPostSchema);

export { AdoptionPost }

