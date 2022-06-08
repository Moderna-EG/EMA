const receivePermissionModel = require('../../models/inventory/ReceivePermission')
const ExchangePermissionModel = require('../../models/inventory/ExchangePermission')
const itemModel = require('../../models/inventory/Item')
const providerModel = require('../../models/inventory/Provider')
const userModel = require('../../models/inventory/User')
const clientModel = require('../../models/inventory/Client')


const addReceivePermission = async (request, response) => {

    try {

        const { itemId, providerId, userId, quantity, price } = request.body

        if(!itemId) {
            return response.status(406).json({
                accepted: false,
                message: 'الصنف مطلوب',
                field: 'item'
            })
        }

        const checkItem = await itemModel.getItemById(itemId)
        
        if(checkItem.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف عنصر غير صالح',
                field: 'item'
            })
        }

        if(!providerId) {
            return response.status(406).json({
                accepted: false,
                message: 'المورد مطلوب',
                field: 'provider'
            })
        }

        const checkProvider = await providerModel.getProviderById(providerId)
        
        if(checkProvider.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف مورد غير صالح',
                field: 'provider'
            })
        }

        if(!userId) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف المستخدم مطلوب',
                field: 'user'
            })
        }

        const checkUser = await userModel.getUserById(userId)
        
        if(checkUser.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هوية مستخدم غير صالحه',
                field: 'user'
            })
        }

        if(!quantity || quantity == 0 || !Number.isInteger(quantity)) {
            return response.status(406).json({
                accepted: false,
                message: 'مطلوب كمية الصنف المستلمة',
                field: 'quantity'
            })
        }

        if(!price || price == 0 || !Number.isInteger(price)) {
            return response.status(406).json({
                accepted: false,
                message: 'مطلوب سعر الصنف المستلم',
                field: 'price'
            })
        }

        const BOOK_VALUE = quantity * price
        const NEW_QUANTITY = checkItem[0].quantity + quantity

        const [ recorded, updated] = await Promise.all([
            receivePermissionModel.addReceivePermission(itemId, providerId, userId, quantity, price, BOOK_VALUE),
            itemModel.updateItemQuantityById(itemId, NEW_QUANTITY)
        ])

        return response.status(200).json({
            accepted: true,
            message: 'تمت إضافة إذن استلام الصنف بنجاح'
        })


    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getReceivePermissions = async (request, response) => {

    try {

        const receivePermissions = await receivePermissionModel.getReceivePermissions()

        return response.status(200).json({
            accepted: true,
            permissions: receivePermissions
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server started'
        })
    }
}

const addExchangePermission = async (request, response) => {

    try {

        const { itemId, clientId, userId, quantity, price } = request.body

        if(!itemId) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف الصنف مطلوب',
                field: 'item'
            })
        }

        const checkItem = await itemModel.getItemById(itemId)

        if(checkItem.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف الصنف غير صالح',
                field: 'item'
            })
        }

        if(!clientId) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف العميل مطلوب',
                field: 'client'
            })
        }

        const checkClient = await clientModel.getClientById(clientId)

        if(checkClient.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف العميل غير صالح',
                field: 'client'
            })
        }

        if(!userId) {
            return response.status(406).json({
                accepted: false,
                message: 'معرف المستخدم مطلوب',
                field: 'user'
            })
        }

        const checkUser = await userModel.getUserById(userId)

        if(checkUser.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هوية مستخدم غير صالحه',
                field: 'user'
            })
        }

        if(!quantity || quantity == 0 || !Number.isInteger(quantity)) {
            return response.status(406).json({
                accepted: false,
                message: 'مطلوب كمية الصنف المستلمة',
                field: 'quantity'
            })
        }

        const CURRENT_ITEM_QUANTITY = checkItem[0].quantity
        const REQUESTED_QUANTITY = quantity

        if(REQUESTED_QUANTITY > CURRENT_ITEM_QUANTITY) {
            return response.status(406).json({
                accepted: false,
                message: `لا توجد كمية كافية ، يتوفر فقط ${CURRENT_ITEM_QUANTITY} قطعة`,
                field: 'quantity'
            })
        }

        if(!price || price == 0 || !Number.isInteger(price)) {
            return response.status(406).json({
                accepted: false,
                message: 'مطلوب سعر الصنف المستلم',
                field: 'price'
            })
        }

        const UPDATED_ITEM_QUANTITY = CURRENT_ITEM_QUANTITY - REQUESTED_QUANTITY
        const BOOK_VALUE = REQUESTED_QUANTITY * price

        const [ recorded, updated] = await Promise.all([
            ExchangePermissionModel.addExchangePermission(itemId, clientId, userId, REQUESTED_QUANTITY, price, BOOK_VALUE),
            itemModel.updateItemQuantityById(itemId, UPDATED_ITEM_QUANTITY)
        ])

        return response.status(200).json({
            accepted: true,
            message: 'تمت إضافة إذن صرف الصنف بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getExchangePermissions = async (request, response) => {

    try {

        const exchangePermissions = await ExchangePermissionModel.getExchangePermissions()

        return response.status(200).json({
            accepted: true,
            permissions: exchangePermissions
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server started'
        })
    }
}

module.exports = { addReceivePermission, getReceivePermissions, addExchangePermission, getExchangePermissions }