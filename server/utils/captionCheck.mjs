/**
 * Returns an array of words starting with a hashtag in a caption
 * @param {String} caption
 * @return {Array} String Array
 * @author Johnny Hoang
 */
function lookForHashtags(caption) {
  const words = caption.split(' ');
  return words
      .filter((x) => x[0] == '#')
      .map((x) => x.slice(1))
      .filter((x) => x != '');
}

export {lookForHashtags};
