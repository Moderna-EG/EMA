const createDBPlaceholders = (list) => {

    let placeholders = ''

    for(let i=1;i<=list.length;i++) {

        if(i == list.length) {
            placeholders += `$${i}`
            break
        }

        placeholders += `$${i}, `
    }

    return placeholders
}

module.exports = { createDBPlaceholders }