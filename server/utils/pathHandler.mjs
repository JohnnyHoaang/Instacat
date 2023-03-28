import {generateID} from './idGenerator.mjs';
import fetch from 'node-fetch';
/**
 * TODO Make JSDocs for this class
 */
class PathHandler {
  /**
     * Checks if image url exists in api
     * @param {URL} api
     * @param {URL} url
     * @return {Boolean}
     * @author Johnny Hoang
     */
  async doesPathExists(api, url) {
    // Instantly return false if path is empty
    if (!url) {
      return false;
    }
    const result = await this.fetchFromAPI(api);
    // Checks if exact url exists in the list
    const filteredPaths = result.filter((x) => x.image == url);
    // Returns true if one path or more is found
    if (filteredPaths.length > 0) {
      return true;
    }
    return false;
  }
  /**
     * Generate unique path by adding unique sequence to start of path
     * @param {String} path
     * @return {String} unique path
     * @author Johnny Hoang
     */
  async generateUniquePath(path) {
    const characters = `${generateID(4)}-`;
    return `${characters}${path}`;
  }
  /**
     * Returns response from API
     * @param {String} api
     * @return {Object} response
     */
  async fetchFromAPI(api) {
    const response = await fetch(api);
    if (response.ok) {
      return await response.json();
    }
  }
}

export {PathHandler};
