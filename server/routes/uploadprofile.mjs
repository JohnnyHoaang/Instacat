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
    console.log(req.body)
    const email = req.body.email
    const username = req.body.username
    try {
        const image = req.files.image
        if(username){
            editUserProfile(email, image, username)
        } else {
            editUserProfile(email, image, null)
        }
    } catch {
        editUserProfile(email, null, username)
    }
    res.status(201).send({success: "update successful!"})

})

export default router