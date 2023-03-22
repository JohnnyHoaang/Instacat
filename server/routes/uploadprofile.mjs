import express from 'express'
import fileUpload from 'express-fileupload'
import { saveToAzure } from '../db/azure.mjs'
import { editUserProfile } from '../db/dataHandler.mjs'
import cors from 'cors'

const router = express.Router()

router.use(cors())
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
    console.log(req)
    res.status(201).send(req.body)
})

export default router