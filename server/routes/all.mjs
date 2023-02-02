import express from 'express'
import Database from '../db/db.mjs'
import dotenv from 'dotenv'

const router = express.Router()
router.use(express.json())

router.get('/hello', async(req,res)=>{
    try {
        res.json({response : "Hello World"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "server error"})
    }
})

router.post('/', async (req, res)=>{
    console.log(req.body)
    console.log("username: " + req.body.username)
    console.log("comment: " + req.body.comment)
    await insertDB("test","usercomments", req.body)
})

router.post('/upload', (req, res) => {
    console.log(req.body)
})

router.get('/usercomments', async (req, res)=>{
    let db = new Database()
    await db.connect("test", "usercomments")
    let data = await db.readAll()
    db.close()
    res.json(data)
})
router.use((req,res) => res.status(404).json({ error : "error"}))

async function insertDB(dbName, collName, body){
    let db = new Database()
    await db.connect(dbName, collName, body)
    await db.addData(body)
    let data = await db.readAll()
    db.close()
    console.log("Returned data:")
    console.log(data)
}

export default router

