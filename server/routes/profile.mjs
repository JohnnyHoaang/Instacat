import express from 'express'
import fileUpload from 'express-fileupload'
import { sendAPI } from '../db/dbHelper.mjs'
import { uploadToAzure } from '../db/azure.mjs'
import { UserProfile } from '../models/UserProfile.mjs'

const router = express.Router()

router.use(express.json())
router.use(
    fileUpload({
        createParentPath: true,
    })
);

router.get('/users', async (req, res) => {
    await sendAPI(res, UserProfile, {})
})

router.post('/upload', async (req, res) => {
    const username = req.body.username
    const file = req.files.image;
    if(username){
        await uploadToAzure(file, username, UserProfile, res)
        res.redirect('/')
    }
})

export default router



