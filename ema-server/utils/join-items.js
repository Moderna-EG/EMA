
const joinItemsByIds = (items, data) => {

    let joinedItems = []

    for(let i=0;i<items.length;i++) {
        for(let j=0;j<data.length;j++) {
            if(items[i].id == data[j].itemid) {

                let item = {
                    name: items[i].name,
                    code: items[i].code
                }
                joinedItems.push({ ...item, ...data[j] })
                break
            }

        }
    }

    return joinedItems
}

module.exports = { joinItemsByIds }