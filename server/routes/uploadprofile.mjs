import express from 'express'
import fileUpload from 'express-fileupload'
import { saveToAzure } from '../db/azure.mjs'
import { editUserProfile } from '../db/dataHandler.mjs'

const router = express.Router()

router.use(express.json())
router.use(
    fileUpload({
        createParentPath: true,
    })
);

// route to edit user profile to db
router.post('/update', async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    try {
        const image = req.files.image
        if(username){
            // Update user profile image and username
            editUserProfile(email, image, username)
        } else {
            // Update user profile image
            editUserProfile(email, image, null)
        }
    } catch {
        // Update user if user does not change image
        editUserProfile(email, null, username)
    }
    res.status(201).send({success: "update successful!"})

})

export default router