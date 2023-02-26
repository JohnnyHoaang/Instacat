import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadToAzure } from '../db/azure.mjs'
import { Post } from '../models/Post.mjs'

const router = express.Router()

router.use(express.json())
router.use(
    fileUpload({
        createParentPath: true,
    })
);

// route to upload image and caption to db
router.post('/post/upload', async (req, res) => {
    const caption = req.body.caption
    const file = req.files.image
    if(file){
        try {
            await uploadToAzure(file, "username", caption, Post, res)
            res.redirect('/')
        } catch(error){
            res.status(404).send({error:"error uploading the post"})
        }
    }
})

export default router


