// Inserts data to DB
async function insertToDB(response, model, body) {
    const user = model(body)
    try {
        await user.save()
    } catch (error) {
        response.status(500).send(error)
    }
}
// Sends back API result with given model and query
async function sendAPI(response, model, query) {
    const data = await model.find(query)
    try {
        response.send(data);
    } catch (error) {
        console.log(error)
        response.status(500).send(error);
    }
}

export { insertToDB, sendAPI }