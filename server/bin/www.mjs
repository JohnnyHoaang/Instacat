import app from '../app.mjs'

const PORT = 3000

await (async (req, res)=> {{
    app.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}`)
    })
}})()