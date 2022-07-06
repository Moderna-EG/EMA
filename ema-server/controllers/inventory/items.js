const itemModal = require('../../models/inventory/Item')
const receivePermissionItemModel = require('../../models/inventory/ReceivePermissionItem')

const getItems = async (request, response) => {

    try {

        const items = await itemModal.getItems()

        return response.status(200).json({
            accepted: true,
            items: items,
        })


    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const addItem = async (request, response) => {

    try {

        const { name, code } = request.body

        if(!name) {
            return response.status(406).json({
                accepted: false,
                message: 'اسم الصنف مطلوب',
                field: 'name'
            })
        }

        const itemByName = await itemModal.getItemByName(name)

        if(itemByName.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'اسم العنصر مستخدم بالفعل',
                field: 'name'
            })
        }

        if(!code) {
            return response.status(406).json({
                accepted: false,
                message: 'الكود مطلوب',
                field: 'code'
            })
        }

        if(!Number.isInteger(code)) {
            return response.status(406).json({
                accepted: false,
                message: 'يجب أن يكون الكود رقمًا',
                field: 'code'
            })
        }

        const itemByCode = await itemModal.getItemByCode(code)

        if(itemByCode.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا الكود مستخدم بالفعل',
                field: 'code'
            })
        }

        const addItem = await itemModal.addItem(name, code)

        return response.status(200).json({
            accepted: true,
            message: 'تمت إضافة الصنف بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: true,
            message: 'internal server error'
        })
    }
}

const getItem = async (request, response) => {

    try {

        const { itemId } = request.params

        const item = await itemModal.getItemById(itemId)

        return response.status(200).json({
            accepted: true,
            item: item
        })


    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getItemAveragePrice = async (request, response) => {

    try {

        const { itemId } = request.params

        const [totalBookValue, totalQuantity] = await Promise.all([
            receivePermissionItemModel.getSumOfBookValueOfItem(itemId),
            receivePermissionItemModel.getTotalQuantityOfItem(itemId)
        ])

        const BOOK_VALUE = totalBookValue[0].sum
        const QUANTITY = totalQuantity[0].sum

        const AVERAGE_PRICE = BOOK_VALUE / QUANTITY


        return response.status(200).json({
            accepted: true,
            price: AVERAGE_PRICE
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}


module.exports = { getItems, addItem, getItem, getItemAveragePrice }