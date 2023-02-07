import express from 'express'
import Database from '../db/db.mjs'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import { BlobServiceClient } from '@azure/storage-blob'

const storageAccountName = process.env.STORAGE_ACCOUNT_NAME
const sasToken = process.env.AZURE_SAS
const containerName = process.env.CONTAINER_NAME
const router = express.Router()

router.use(express.json())
router.use(
    fileUpload({
        createParentPath: true,
    })
);


router.get('/hello', async (req, res) => {
    try {
        res.json({ response: "Hello World" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "server error" })
    }
})

router.get('/usercomments', async (req, res) => {
    await sendAPI(res, "test", "usercomments")
})

router.get('/userprofiles', async (req, res) => {
    await sendAPI(res, "test", "userprofiles")
})

router.post('/', async (req, res) => {
    await insertDB("test", "usercomments", req.body)
})

router.post("/profileUpload", async (req, res) => {
    const username = req.body.username
    const file = req.files.image;
    if (file) {
        const path = file.name;
        const baseURL = `https://${storageAccountName}.blob.core.windows.net/`
        const blobURL = `${baseURL}${containerName}/${path}`
        const blobService = new BlobServiceClient(
            `${baseURL}?${sasToken}`
        );
        const containerClient = blobService.getContainerClient(containerName);
        const blobClient = containerClient.getBlockBlobClient(path);
        const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
        await blobClient.uploadData(file.data, options);
        await insertDB("test", "userprofiles", { username: username, profileURL: blobURL })
    } else {
        await insertDB("test", "userprofiles", { username: username, profileURL: "" })
    }

})
router.use((req, res) => res.status(404).json({ error: "error" }))

// Sends data from db to API
async function sendAPI(res, table, collection) {
    let db = new Database()
    await db.connect(table, collection)
    let data = await db.readAll()
    db.close()
    res.json(data)
}
// insert body to specified table
async function insertDB(dbName, collName, body) {
    let db = new Database()
    await db.connect(dbName, collName, body)
    await db.addData(body)
    let data = await db.readAll()
    db.close()
    console.log("Returned data:")
    console.log(data)
}

export default router

