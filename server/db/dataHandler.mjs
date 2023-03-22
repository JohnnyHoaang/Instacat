import {  saveToAzure }  from './azure.mjs'
import { Post } from '../models/Post.mjs'
import  { User } from '../models/User.mjs'
import { DBHelper } from '../db/dbHelper.mjs'

const db = new DBHelper()

async function editUserProfile(email, file, username){
    if(file){
        const blobURL  = await saveToAzure(file)
        db.updateData(User, { email: email }, { picture: blobURL})
    }
    if(username){
        db.updateData(User, { email: email }, { name: username})
    }
}

async function updateLikes(query, isLiked) {
    let data = await db.getQueryData(Post, query)
    if (isLiked) {
      data[0]["likes"] += 1
    } else {
      data[0]["likes"] -= 1
    }
    await db.updateData(Post, query, {likes: data[0]["likes"]})
  }
  
export { editUserProfile, updateLikes }