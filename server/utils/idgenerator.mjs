/**
 * Generate random IDs with a given length
 * @param {Int} length 
 * @returns {String} ID String
 * @author Johnny Hoang
 */
function generateID(length) {
  if (length > 0) {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter < length) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return id;
  } else {
    throw new Error("ID must have length more than 0")
  }

}

export { generateID }