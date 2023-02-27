import express from 'express'
import path from 'path'

const __dirname = path.resolve();
const router = express.Router()

router.use(express.json())

router.get(["/home","/contact","/discover","/aboutUs", "/adopt", "/add/post"], (req,res) =>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
});

router.use((req, res) => res.status(404).json({ error: "error" }))

export default router

