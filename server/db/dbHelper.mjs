import { UserComment } from "../models/UserComment.mjs"
import { UserProfile } from "../models/UserProfile.mjs"
// Inserts data to DB
async function insertToDB(response, body, type) {
    console.log(type)
    try {
        if (type == "usercomments") {
            const usercomments = UserComment(body)
            console.log(usercomments)
            usercomments.save()
        } else if (type == "userprofiles") {
            const userprofiles = UserProfile(body)
            userprofiles.save()
        }
    } catch (error) {
        response.status(500).send(error)
    }


}
// Sends back API result
async function sendAPI(response, type) {
    let users
    if (type == "usercomments") {
        users = await UserComment.find({})
    } else if (type == "userprofiles") {
        users = await UserProfile.find({})
    }
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
}

export { insertToDB, sendAPI }