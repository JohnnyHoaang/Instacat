import { UserComment } from "../models/UserComment.mjs"
import { UserProfile } from "../models/UserProfile.mjs"
// Inserts data to DB
async function insertToDB(response, body, type) {
    let user
    if(type == "usercomments"){
        user = UserComment(body)
    } else if (type == "userprofiles") {
        user = UserProfile(body)
    }
    try {
        await user.save()
    } catch (error) {
        response.status(500).send(error)
    }
}
// Sends back API result
async function sendAPI(response, type) {
    let users
    if(type =="usercomments"){
        users = await UserComment.find({})
    } else if(type== "userprofiles") {
        users = await UserProfile.find({})
    }
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
}

export { insertToDB, sendAPI }