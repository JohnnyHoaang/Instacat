// return words starting with a hashtag with a given caption
function lookForHashtags(caption){
    let words = caption.split(' ')
    return words.filter(x => x[0] == '#').map(x => x.slice(1))
}

export { lookForHashtags }