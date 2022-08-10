const extractItemsIds = (permissions) => {

    let Ids = []

    for(let i=0;i<permissions.length;i++) {
        Ids.push(permissions[i].itemid)
    }

    return Ids
}

module.exports = { extractItemsIds }