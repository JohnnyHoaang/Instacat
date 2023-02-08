import Database from "./db.mjs"

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
    await db.close()
}

export { sendAPI, insertDB }