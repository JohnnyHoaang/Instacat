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
    console.log(req.body)
})

export default router