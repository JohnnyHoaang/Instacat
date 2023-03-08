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
    if (username) {
        // updates profile username
        editUserProfile(email, null, username)
    }
    try {
        const file = req.files.image
        // updates user profile image
        editUserProfile(email, file, null)
    } catch (error) {
        // catch error if there is no file
        console.error(error)
    } finally {
        res.redirect("/")
    }
})

export default router