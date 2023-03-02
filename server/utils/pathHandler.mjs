import { generateID } from './idgenerator.mjs'

class PathHandler {
    /**
     * Checks if image url exists in api
     * @param {URL} api
     * @param {URL} url
     * @returns {Boolean} 
     * @author Johnny Hoang 
     */
    async doesPathExists(api, url) {
        // Instantly return false if path is empty
        if(url == "" || url == undefined){
            return false
        } 
        const result = await this.fetchFromAPI(api)
        // Checks if exact url exists in the list
        let filteredPaths = result.filter(x => x.image == url)
        // Returns true if one path or more is found
        if (filteredPaths.length > 0) {
            return true
        }
        return false
    }
    /**
     * Generate unique path by adding unique sequence to start of path
     * @param {String} path
     * @returns {String} unique path
     * @author Johnny Hoang 
     */
    async generateUniquePath(path) {
        let characters = `${generateID(4)}-`
        return `${characters}${path}`
    }
    /**
     * Returns response from API
     * @param {String} api 
     * @returns {Object} response
     */
    async fetchFromAPI(api){
        let response = await fetch(api)
        if (response.ok) {
            return await response.json()
        }
    }
}

export { PathHandler }