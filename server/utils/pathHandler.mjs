import { generateID } from './idgenerator.mjs'
/**
 * Check if image url exists in api
 * @param {URL} api
 * @param {URL} url
 * @returns {Boolean} 
 * @author Johnny Hoang 
 */
async function doesPathExists(api, url){
    let result
    let response = await fetch(api)
    if(response.ok){
        result = await response.json()
    }
    let filteredPaths = result.filter(x => x.image == url)
    if(filteredPaths.length > 0){
        return true
    }
    return false
}
/**
 * @param {String} path
 * @returns {String} unique path
 * @author Johnny Hoang 
 */
async function generateUniquePath(path){
    let characters = `${generateID(4)}-`
    return `${characters}${path}`
}

export { doesPathExists, generateUniquePath }
