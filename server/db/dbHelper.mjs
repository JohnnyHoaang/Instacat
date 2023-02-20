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
        try {
            return data
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    }

}
export { DBHelper }