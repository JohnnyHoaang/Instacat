import { BlobServiceClient } from '@azure/storage-blob'
import { insertDB } from '../db/dbHelper.mjs'

const storageAccountName = process.env.STORAGE_ACCOUNT_NAME
const sasToken = process.env.AZURE_SAS
const containerName = process.env.CONTAINER_NAME

// upload image file to azure
async function uploadToAzure(file, username) {
    if (file) {
        const path = file.name
        const baseURL = `https://${storageAccountName}.blob.core.windows.net/`
        const blobURL = `${baseURL}${containerName}/${path}`
        const blobService = new BlobServiceClient(
            `${baseURL}?${sasToken}`
        )
        const containerClient = blobService.getContainerClient(containerName)
        const blobClient = containerClient.getBlockBlobClient(path)
        const options = { blobHTTPHeaders: { blobContentType: file.mimetype } }
        await blobClient.uploadData(file.data, options)
        await insertDB("test", "userprofiles", { username: username, profileURL: blobURL })
    } else {
        await insertDB("test", "userprofiles", { username: username, profileURL: "" })
    }
}

export { uploadToAzure }
