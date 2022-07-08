const itemModel = require('../../models/inventory/Item')
const receivePermissionItemModel = require('../../models/inventory/ReceivePermissionItem')
const exchangePermissionItemModel = require('../../models/inventory/ExchangePermissionItem')
const providerModel = require('../../models/inventory/Provider')
const clientModel = require('../../models/inventory/Client')
const { joinReceivePermissionsByProviders, joinExchangePermissionsByClients } = require('../../utils/permissions-aggregation')


const getItems = async (request, response) => {

    try {

        const items = await itemModel.getItems()

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

        const itemByName = await itemModel.getItemByName(name)

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

        const itemByCode = await itemModel.getItemByCode(code)

        if(itemByCode.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا الكود مستخدم بالفعل',
                field: 'code'
            })
        }

        const addItem = await itemModel.addItem(name, code)

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

        const item = await itemModel.getItemById(itemId)

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

const getItemCard = async (request, response) => {

    try {

        const { itemId } = request.params

        let [item, exchangePermissions, receivePermissions, providers, clients] = await Promise.all([
            itemModel.getItemById(itemId),
            exchangePermissionItemModel.getExchangePermissionOfItem(itemId),
            receivePermissionItemModel.getReceivePermissionOfItem(itemId),
            providerModel.getProviders(),
            clientModel.getClients()
        ])

        if(item.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف الصنف غير موجود'
            })
        }

        if(providers.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'لا يوجد موردين'
            })
        }

        if(clients.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'لا يوجد عملاء'
            })
        }

        if(exchangePermissions.length != 0) {
            exchangePermissions = joinExchangePermissionsByClients(exchangePermissions, clients)
        }

        if(receivePermissions.length != 0) {
            receivePermissions = joinReceivePermissionsByProviders(receivePermissions, providers)
        }

        let permissions = [...exchangePermissions, ...receivePermissions]

        permissions.sort((permission1, permission2) => {

            const PERMISSION_1_DATE = new Date(permission1.permissiondate)
            const PERMISSION_2_DATE = new Date(permission2.permissiondate)

            return PERMISSION_1_DATE - PERMISSION_2_DATE
        })

        return response.status(200).json({
            accepted: true,
            item: item[0],
            permissions
        })


    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

module.exports = { 
    getItems,
    addItem,
    getItem,
    getItemAveragePrice,
    getItemCard
}