import { BlobServiceClient } from '@azure/storage-blob'
import dotenv from 'dotenv'
import { generateID } from '../utils/idgenerator.mjs'
import { lookForHashtags } from '../utils/captioncheck.mjs'
import { DBHelper } from '../db/dbHelper.mjs'
import { PathHandler } from '../utils/pathHandler.mjs'

const db = new DBHelper()
const ph = new PathHandler()

dotenv.config()

const storageAccountName = process.env.STORAGE_ACCOUNT_NAME
const sasToken = process.env.AZURE_SAS
const containerName = process.env.CONTAINER_NAME
const apiURL = "https://cattus.azurewebsites.net/api/cat/all"
/**
 * Uploads image file to azure blob storage.
 * @param {File} file 
 * @param {String} username 
 * @param {String} caption 
 * @param {Model} model 
 * @author Johnny Hoang
 */
async function uploadToAzure(file, username, caption, model) {
    let path = file.name
    const baseURL = `https://${storageAccountName}.blob.core.windows.net/`
    let blobURL = `${baseURL}${containerName}/${path}`
    const blobService = new BlobServiceClient(`${baseURL}?${sasToken}`)
    const containerClient = blobService.getContainerClient(containerName)
    // check file name exists in azure cloud
    const check = await ph.doesPathExists(apiURL, blobURL)
    if(check){
        // generate new unique file name 
        path = await ph.generateUniquePath(path)
        blobURL = `${baseURL}${containerName}/${path}`
    }
    const blobClient = containerClient.getBlockBlobClient(path)
    const options = { blobHTTPHeaders: { blobContentType: file.mimetype } }
    await blobClient.uploadData(file.data, options)
    const data = getPostData(username, blobURL, caption)
    await db.insertToDB(model, data)
}
/**
 * Creates a post object based on the given parameters.
 * @param {String} username 
 * @param {String} image 
 * @param {String} caption 
 * @returns {obj} post
 * @author Johnny Hoang
 */
function getPostData(username, image, caption) {
    let post = {
        id: generateID(6),
        image: image,
        username: username,
        caption: caption,
        hashtags: lookForHashtags(caption),
        likes: 0,
        comments: []
    }
    return post
}

export { uploadToAzure }
