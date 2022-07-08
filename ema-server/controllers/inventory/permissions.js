const receivePermissionModel = require('../../models/inventory/ReceivePermission')
const exchangePermissionModel = require('../../models/inventory/ExchangePermission')
const receivePermissionItemModel = require('../../models/inventory/ReceivePermissionItem')
const exchangePermissionItemModel = require('../../models/inventory/ExchangePermissionItem')
const itemModel = require('../../models/inventory/Item')
const providerModel = require('../../models/inventory/Provider')
const userModel = require('../../models/inventory/User')
const clientModel = require('../../models/inventory/Client')
const ExchangePermissionItem = require('../../models/inventory/ExchangePermissionItem')


const calculateItemsTotalPrice = async (items) => {

    let total = 0

    for(let i=0;i<items.length;i++) {

        total += (parseInt(items[i].quantity) * items[i].price)
        console.log('here')
    }

    console.log(total)
    return total
}


const saveReceivePermissionItems = async (items, permissionId) => {

    for(let i=0;i<items.length;i++) {

        const item = items[i]

        const storedItem = await itemModel.getItemById(item.id)
        const UPDATED_QUANTITY = storedItem[0].quantity + item.quantity

        const addPermission = receivePermissionItemModel.addReceivePermissionItem(
            items[i].id,
            permissionId,
            items[i].quantity,
            items[i].price,
            items[i].quantity * items[i].price
        )

        const updateItem = itemModel.updateItemQuantityById(item.id, UPDATED_QUANTITY)

        const transact = await Promise.all([addPermission, updateItem])

    }
}

const saveExchangePermissionItems = async (items, permissionId) => {

    for(let i=0;i<items.length;i++) {

        const item = items[i]

        const storedItem = await itemModel.getItemById(item.itemId)

        if(storedItem[0].quantity == 0 || storedItem[0].quantity < item.quantity) {

            continue
        }
        const UPDATED_QUANTITY = storedItem[0].quantity - item.quantity

        const addPermission = exchangePermissionItemModel.addExchangePermissionItem(
            items[i].id,
            permissionId,
            items[i].quantity,
            items[i].price,
            items[i].quantity * items[i].price
        )

        const updateItem = itemModel.updateItemQuantityById(item.id, UPDATED_QUANTITY)

        const transact = await Promise.all([addPermission, updateItem])

    }
}

const addReceivePermission = async (request, response) => {

    try {

        const { providerId, userId, items } = request.body

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

        if(!items) {
            return response.status(406).json({
                accepted: false,
                message: 'لا توجد اصناف',
                field: 'items'
            })
        }

        const PERMISSION_DATE = new Date()
        const TOTAL_VALUE = calculateItemsTotalPrice(items)

        const receivePemrmission = await receivePermissionModel.addReceivePermission(providerId, userId, TOTAL_VALUE, PERMISSION_DATE)

        const activeReceivePermission = await receivePermissionModel.getReceivePermissionByMainData(providerId, userId, PERMISSION_DATE)

        const PERMISSION_ID = activeReceivePermission[0].id

        const recordItems = await saveReceivePermissionItems(items, PERMISSION_ID)

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

const getUserReceivePermission = async (request, response) => {

    try {

        const { userId } = request.params

        const permissions = await receivePermissionModel.getReceivePermissionsByUser(userId)

        if(permissions.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'لا يوجد اذن استلام للموظف'
            })
        }

        const newestPermission = permissions[0]
        const permissionItems = await receivePermissionItemModel.getReceivePermissionItemById(newestPermission.permissionid)

        return response.status(200).json({
            accepted: true,
            permission: newestPermission,
            permissionItems: permissionItems
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getUserExchangePermission = async (request, response) => {

    try {

        const { userId } = request.params

        const permissions = await exchangePermissionModel.getExchangePermissionsByUser(userId)

        if(permissions.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'لا يوجد اذن صرف للموظف'
            })
        }

        const newestPermission = permissions[0]
        const permissionItems = await exchangePermissionItemModel.getExchangePermissionItemById(newestPermission.permissionid)

        return response.status(200).json({
            accepted: true,
            permission: newestPermission,
            permissionItems: permissionItems
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const addExchangePermission = async (request, response) => {

    try {

        const { clientId, userId, items } = request.body

        if(!clientId) {
            return response.status(406).json({
                accepted: false,
                message: 'العميل مطلوب',
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

        if(!items) {
            return response.status(406).json({
                accepted: false,
                message: 'لا توجد اصناف',
                field: 'items'
            })
        }

        const PERMISSION_DATE = new Date()
        const TOTAL_VALUE = await calculateItemsTotalPrice(items)

        const exchangePemrmission = await exchangePermissionModel.addExchangePermission(clientId, userId, TOTAL_VALUE, PERMISSION_DATE)

        const activeExchangePermission = await exchangePermissionModel.getExchangePermissionByMainData(clientId, userId, PERMISSION_DATE)

        const PERMISSION_ID = activeExchangePermission[0].id

        const recordItems = await saveExchangePermissionItems(items, PERMISSION_ID)

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
            message: 'internal server error'
        })
    }
}

const getExchangePermissions = async (request, response) => {

    try {

        const exchangePermissions = await exchangePermissionModel.getExchangePermissions()

        return response.status(200).json({
            accepted: true,
            permissions: exchangePermissions
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getReceivePermission = async (request, response) => {

    try {

        const { permissionId } = request.params

        const [permission, permissionItems] = await Promise.all([
            receivePermissionModel.getReceivePermission(permissionId),
            receivePermissionItemModel.getReceivePermissionItemById(permissionId),
        ])

        return response.status(200).json({
            accepted: true,
            permission: permission[0],
            permissionItems
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getExchangePermission = async (request, response) => {

    try {

        const { permissionId } = request.params

        const [permission, permissionItems] = await Promise.all([
            exchangePermissionModel.getExchangePermission(permissionId),
            exchangePermissionItemModel.getExchangePermissionItemById(permissionId)
        ])

        return response.status(200).json({
            accepted: true,
            permission: permission[0],
            permissionItems
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
    addReceivePermission, 
    getReceivePermissions, 
    addExchangePermission, 
    getExchangePermissions,
    getUserReceivePermission,
    getUserExchangePermission,
    getReceivePermission,
    getExchangePermission
 }