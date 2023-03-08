import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadToAzure } from '../db/azure.mjs'

const router = express.Router()

router.use(express.json())
router.use(
    fileUpload({
        createParentPath: true,
    })
);

// route to edit user profile to db
router.post('/edit-profile/upload', async (req, res) => {
    const file = req.files.image
    if (file) {
        try {
            //await uploadToAzure(file, "username", caption, Post, res)
            res.redirect('/')
        } catch(error){
            console.error(error)
            res.status(500).send({error:"error editing the profile"})
        }
    }
})

export default router