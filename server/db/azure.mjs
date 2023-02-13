import { BlobServiceClient } from '@azure/storage-blob'
import { insertToDB } from '../db/dbHelper.mjs'
import dotenv from 'dotenv'
import { generateID } from '../utils/idgenerator.mjs'
import { lookForHashtags } from '../utils/captioncheck.mjs'
dotenv.config()
const storageAccountName = process.env.STORAGE_ACCOUNT_NAME
const sasToken = process.env.AZURE_SAS
const containerName = process.env.CONTAINER_NAME

// upload image file to azure
async function uploadToAzure(file, username, caption, model, response) {
    const path = file.name
    const baseURL = `https://${storageAccountName}.blob.core.windows.net/`
    const blobURL = `${baseURL}${containerName}/${path}`
    const blobService = new BlobServiceClient(`${baseURL}?${sasToken}`)
    const containerClient = blobService.getContainerClient(containerName)
    const blobClient = containerClient.getBlockBlobClient(path)
    const options = { blobHTTPHeaders: { blobContentType: file.mimetype } }
    await blobClient.uploadData(file.data, options)
    const data = getPostData(username, blobURL, caption)
    await insertToDB(response, model, data)
}

function getPostData(username, image, caption){
    return {
        id: generateID(6),
        image: image,
        username: username,
        caption: caption,
        hashtags: lookForHashtags(caption),
        likes: 0,
        comments: []
    }
}

export { uploadToAzure }
