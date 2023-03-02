let _instance = null
class DBHelper {
    constructor() {
        if (_instance) {
            return _instance
        }
        _instance = this;
    }
    /**
 * Inserts model data to DB.
 * @param {Object} response 
 * @param {Model} model 
 * @param {Object} body 
 * @author Johnny Hoang
 */
    async insertToDB(response, model, body) {
        const user = model(body)
        try {
            await user.save()
        } catch (error) {
            response.status(500).send(error)
        }
    }
    /**
     * Returns query result with given model and query.
     * @param {Model} model 
     * @param {Object} query 
     * @author Johnny Hoang
     */
    async getQueryData(model, query) {
        const data = await model.find(query)
        return data
    }
    /**
     * Send data to the API route
     * @param {Object} response
     * @param {Model} model 
     * @param {String} query 
     */
    async sendData(response, model, query) {
        // Receive data from db
        const data = await this.getQueryData(model, query)
        if (data.length > 0) {
            // send data to route
            response.json(data)
        } else {
            response.status(404).send({ error: "data not found" })
        }
    }

}
export { DBHelper }