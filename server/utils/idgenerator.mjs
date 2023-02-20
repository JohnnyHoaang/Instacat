/**
 * Generate random IDs with a given length
 * @param {Int} length 
 * @returns {String} ID String
 * @author Johnny Hoang
 */
function generateID(length) {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter < length) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return id;
}

export { generateID }