const receivePermissionModel = require('../../models/inventory/ReceivePermission')
const exchangePermissionModel = require('../../models/inventory/ExchangePermission')
const receivePermissionItemModel = require('../../models/inventory/ReceivePermissionItem')
const exchangePermissionItemModel = require('../../models/inventory/ExchangePermissionItem')
const itemModel = require('../../models/inventory/Item')
const providerModel = require('../../models/inventory/Provider')
const userModel = require('../../models/inventory/User')
const clientModel = require('../../models/inventory/Client')
const ExchangePermissionItem = require('../../models/inventory/ExchangePermissionItem')


const getItemQuantityAtThatDate = async (itemId, date) => {

    const [receivedItemsQuantity, exchangedItemsQuantity] = await Promise.all([
        receivePermissionItemModel.getItemQuantityBeforeDatetime(itemId, date),
        exchangePermissionItemModel.getItemQuantityBeforeDatetime(itemId, date)
    ])

    const RECEIVED_QUANTITY = Number.parseInt(receivedItemsQuantity[0].sum)
    const EXCHANGED_QUANTITY = Number.parseInt(exchangedItemsQuantity[0].sum)

    const CURRENT_QUANTITY = RECEIVED_QUANTITY - EXCHANGED_QUANTITY


    return CURRENT_QUANTITY

}


const extractItemsIds = (permissions) => {

    let Ids = []

    for(let i=0;i<permissions.length;i++) {
        Ids.push(permissions[i].itemid)
    }

    return Ids
}

const extractPermissionsIds = (permissions) => {

    let Ids = []

    for(let i=0;i<permissions.length;i++) {
        Ids.push(permissions[i].id)
    }

    return Ids
}

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

const calculateItemsNewQuantityWithDate = async (itemsIds, date) => {

    for(let i=0;i<itemsIds.length;i++) {

        let itemId = itemsIds[i]

        const [receivedQuantity, exchangedQuantity] = await Promise.all([
            receivePermissionItemModel.getItemQuantityByDatetime(itemId, date),
            exchangePermissionItemModel.getItemQuantityByDatetime(itemId, date)
        ])

        let ITEM_RECEIVED_QUANTITY = Number.parseInt(receivedQuantity[0].sum)
        let ITEM_EXCHANGED_QUANTITY = Number.parseInt(exchangedQuantity[0].sum)

        if(!ITEM_RECEIVED_QUANTITY) ITEM_RECEIVED_QUANTITY = 0
        if(!ITEM_EXCHANGED_QUANTITY) ITEM_EXCHANGED_QUANTITY = 0

        const CURRENT_QUANTITY = ITEM_RECEIVED_QUANTITY - ITEM_EXCHANGED_QUANTITY

        const updateItem = await itemModel.updateItemQuantityById(itemId, CURRENT_QUANTITY)
    }
}

const removeDuplicates = (Ids) => {

    let unqiue = []

    for(let i=0;i<Ids.length;i++) {

        let found = false

        for(let j=0;j<unqiue.length;j++) {

            if(Ids[i] == unqiue[j]) {
                found = true
            }

        }

        if(!found) {
            unqiue.push(Ids[i])
        }
    }

    return unqiue
}

const checkPermissionsQuantitiesAfterEdite = (newQuantity, permissions) => {

    for(let i=0;i<permissions.length;i++) {

        if(permissions[i].type == 'receive') {

            newQuantity += permissions[i].quantity
        }

        if(permissions[i].type == 'exchange') {

            newQuantity -= permissions[i].quantity
        }

        if(newQuantity < 0) {
            return { isAccepted: false, permission: permissions[i] }
        }
    }

    return { isAccepted: true }
}
 

const updateReceivePermissionQuantityAndBookValue = async (permissionId, receivePermissionItemId, itemQuantity, newPrice) => {

    const NEW_BOOK_VALUE = itemQuantity * newPrice


    const updateNewQuantity = await receivePermissionItemModel
    .updateReceivePermissionsItemQuantityAndBookValueById(receivePermissionItemId, itemQuantity, NEW_BOOK_VALUE)

    
    const totalValueList = await receivePermissionItemModel.getReceivePermissionItemsTotalPrice(permissionId)
    const NEW_TOTAL_VALUE = Number.parseInt(totalValueList[0].sum)

    const newPermissionTotalValue = await receivePermissionModel
    .updateReceivePermissionTotalValue(permissionId, NEW_TOTAL_VALUE)

}

const updateReceivePermissionPriceAndBookValue = async (permissionId, receivePermissionItemId, newQuantity, itemPrice) => {

    const NEW_BOOK_VALUE = newQuantity * itemPrice

    const updateNewPrice = await receivePermissionItemModel
    .updateReceivePermissionsItemPriceAndBookValueById(receivePermissionItemId, itemPrice, NEW_BOOK_VALUE)
    
    const totalValueList = await receivePermissionItemModel.getReceivePermissionItemsTotalPrice(permissionId)
    const NEW_TOTAL_VALUE = Number.parseInt(totalValueList[0].sum)

    const newPermissionTotalValue = await receivePermissionModel
    .updateReceivePermissionTotalValue(permissionId, NEW_TOTAL_VALUE)

}

const deleteReceivePermissionItemAndUpdatePermission = async (permissionId, receivePermissionItemId) => {

    const deletePermissionItem = await receivePermissionItemModel.deleteReceivePermissionsItemsById(receivePermissionItemId)

    const permissionItems = await receivePermissionItemModel.getReceivePermissionItemById(permissionId)

    if(permissionItems.length == 0) {

        const deletePermission = await receivePermissionModel.deleteReceivePermission(permissionId)

    } else {

        const totalValueList = await receivePermissionItemModel.getReceivePermissionItemsTotalPrice(permissionId)
        const NEW_TOTAL_VALUE = Number.parseInt(totalValueList[0].sum)

        const newPermissionTotalValue = await receivePermissionModel
        .updateReceivePermissionTotalValue(permissionId, NEW_TOTAL_VALUE)
    }
    
}

const deleteExchangePermissionItemAndUpdatePermission = async (permissionId, exchangePermissionItemId) => {

    const deletePermissionItem = await exchangePermissionItemModel.deleteExchangePermissionsItemsById(exchangePermissionItemId)

    const permissionItems = await exchangePermissionItemModel.getExchangePermissionItemById(permissionId)

    if(permissionItems.length == 0) {

        const deletePermission = await exchangePermissionModel.deleteExchangePermission(permissionId)

    } else {

        const totalValueList = await exchangePermissionItemModel.getExchangePermissionItemsTotalPrice(permissionId)
        const NEW_TOTAL_VALUE = Number.parseInt(totalValueList[0].sum)

        const newPermissionTotalValue = await exchangePermissionModel
        .updateExchangePermissionTotalValue(permissionId, NEW_TOTAL_VALUE)
    }
    
}


const updateExchangePermissionQuantityAndBookValue = async (permissionId, exchangePermissionItemId, newQuantity, itemPrice) => {

    const NEW_BOOK_VALUE = newQuantity * itemPrice

    const updateNewQuantity = await exchangePermissionItemModel
    .updateExchangePermissionsItemQuantityAndBookValueById(exchangePermissionItemId, newQuantity, NEW_BOOK_VALUE)
    
    const totalValueList = await exchangePermissionItemModel.getExchangePermissionItemsTotalPrice(permissionId)
    const NEW_TOTAL_VALUE = Number.parseInt(totalValueList[0].sum)

    const newPermissionTotalValue = await exchangePermissionModel
    .updateExchangePermissionTotalValue(permissionId, NEW_TOTAL_VALUE)

}

const updateItemsPrices = async (permissions) => {

    for(let i=0;i<permissions.length;i++) {

        const itemAveragePrice = await receivePermissionItemModel
        .getAveragePriceOfItemByDate(permissions[i].itemid, permissions[i].permissiondate)

        const AVERAGE_PRICE = Math.trunc(itemAveragePrice[0].avg)
        const BOOK_VALUE = AVERAGE_PRICE * permissions[i].quantity


        const updatePermisison = await exchangePermissionItemModel
        .updateExchangePermissionsItemPriceAndBookValueById(permissions[i].id, AVERAGE_PRICE, BOOK_VALUE)

        
    }
}

const calculateItemsTotalPrice = (items) => {

    let total = 0

    for(let i=0;i<items.length;i++) {

        total += (parseInt(items[i].quantity) * items[i].price)
    }

    return total
}

const calculateExchangeItemsTotalPrice = async (items) => {

    let total = 0

    for(let i=0;i<items.length;i++) {

        const itemAveragePrice = await receivePermissionItemModel.getAveragePriceOfItem(items[i].itemId)
        const ITEM_PRICE = Math.trunc(itemAveragePrice[0].avg)

        total += (parseInt(items[i].quantity) * ITEM_PRICE)
    }

    return total
}

const calculateAndUpdateItemQuantity = async (itemId) => {

    const [totalReceived, totalExchanged] = await Promise.all([
        receivePermissionItemModel.getItemTotalQuantity(itemId),
        exchangePermissionItemModel.getItemTotalQuantity(itemId)
    ])

    let TOTAL_RECEIVED = Number.parseInt(totalReceived[0].sum)
    let TOTAL_EXCHANGED = Number.parseInt(totalExchanged[0].sum)

    if(!TOTAL_RECEIVED) TOTAL_RECEIVED = 0
    if(!TOTAL_EXCHANGED) TOTAL_EXCHANGED = 0

    const CURRENT_QUANTITY = TOTAL_RECEIVED - TOTAL_EXCHANGED
    
    const updateItemQuantity = await itemModel.updateItemQuantityById(itemId, CURRENT_QUANTITY)
}


const saveReceivePermissionItems = async (items, permissionId) => {

    for(let i=0;i<items.length;i++) {

        const item = items[i]

        const storedItem = await itemModel.getItemById(item.itemId)
        console.log(storedItem)
        const UPDATED_QUANTITY = storedItem[0].quantity + item.quantity

        const addPermission = receivePermissionItemModel.addReceivePermissionItem(
            items[i].itemId,
            permissionId,
            items[i].quantity,
            items[i].price,
            items[i].quantity * items[i].price
        )

        const updateItem = itemModel.updateItemQuantityById(item.itemId, UPDATED_QUANTITY)

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

        const itemAveragePrice = await receivePermissionItemModel.getAveragePriceOfItem(items[i].itemId)
        const ITEM_PRICE = Math.trunc(itemAveragePrice[0].avg)

        const addPermission = exchangePermissionItemModel.addExchangePermissionItem
        const updateItem = itemModel.updateItemQuantityById

        const [permission, updatedItem] = await Promise.all([
            addPermission(items[i].itemId, permissionId, items[i].quantity, ITEM_PRICE, items[i].quantity * ITEM_PRICE),
            updateItem(item.itemId, UPDATED_QUANTITY)
        ])

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
            message: 'تمت إضافة إذن استلام الصنف بنجاح',
            permissionId: PERMISSION_ID
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
        const TOTAL_VALUE = await calculateExchangeItemsTotalPrice(items)

        const exchangePemrmission = await exchangePermissionModel.addExchangePermission(clientId, userId, TOTAL_VALUE, PERMISSION_DATE)

        const activeExchangePermission = await exchangePermissionModel.getExchangePermissionByMainData(clientId, userId, PERMISSION_DATE)

        const PERMISSION_ID = activeExchangePermission[0].id

        const recordItems = await saveExchangePermissionItems(items, PERMISSION_ID)

        return response.status(200).json({
            accepted: true,
            message: 'تمت إضافة إذن صرف الصنف بنجاح',
            permissionId: PERMISSION_ID
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

const updateReceivePermissionProvider = async (request, response) => {

    try {

        const { permissionId } = request.params

        const { providerCode } = request.body

        if(!providerCode) return response.status(406).json({
            accepted: false,
            message: 'كود المورد مطلوب',
            field: 'providerCode'
        }) 

        const receivePermissionList = await receivePermissionModel.getReceivePermission(permissionId)

        if(receivePermissionList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'معرف الاذن غير موجود',
            field: 'permisisonId'
        })

        const providerList = await providerModel.getProviderByCode(providerCode)

        if(providerList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'كود المورد غير موجود',
            field: 'providerId'
        })

        const provider = providerList[0]
        const permission = receivePermissionList[0]

        const updatePermission = await receivePermissionModel.updateReceivePermissionProvider(permissionId, provider.id)

        return response.status(200).json({
            accepted: true,
            message: 'تم تعديل اذن الاستلام بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const updateExchangePermissionClient = async (request, response) => {

    try {

        const { permissionId } = request.params

        const { clientCode } = request.body

        if(!clientCode) return response.status(406).json({
            accepted: false,
            message: 'كود العميل مطلوب',
            field: 'clientCode'
        }) 

        const exchangePermissionList = await exchangePermissionModel.getExchangePermission(permissionId)

        if(exchangePermissionList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'معرف الاذن غير موجود',
            field: 'permisisonId'
        })

        const clientList = await clientModel.getClientByCode(clientCode)

        if(clientList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'كود العميل غير موجود',
            field: 'clientId'
        })

        const client = clientList[0]
        const permission = exchangePermissionList[0]

        const updatePermission = await exchangePermissionModel.updateExchangePermissionClient(permissionId, client.id)

        return response.status(200).json({
            accepted: true,
            message: 'تم تعديل اذن الصرف بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getProviderPermissions = async (request, response) => {

    try {

        const { providerId } = request.params

        const permissions = await receivePermissionModel.getReceivePermissionsByProvider(providerId)

        return response.status(200).json({
            accepted: true,
            permissions: permissions
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getClientPermissions = async (request, response) => {

    try {

        const { clientId } = request.params

        const permissions = await exchangePermissionModel.getExchangePermissionsByClient(clientId)

        return response.status(200).json({
            accepted: true,
            permissions: permissions
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const deletePermissiosAndUpdateItems = async (request, response) => {

    try {

        const { permissionType, permissionId } = request.params

        let permissionList

        if(permissionType == 'receive') {

            permissionList = await receivePermissionModel.getReceivePermission(permissionId)

        } else if(permissionType == 'exchange') {

            permissionList = await exchangePermissionModel.getExchangePermission(permissionId)

        } else {

            return response.status(406).json({
                accepted: false,
                message: 'invalid permission type'
            })
        }
        
        if(permissionList.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'لا يوجد اذن بهذا الرقم'
            })
        }

        const permission = permissionList[0]


        let [itemsReceivePermisisonList, itemsExchangePermisisonList] = await Promise.all([
            receivePermissionModel
            .getReceivePermissionsAndAfterByDatetime(permission.permissiondate),

            exchangePermissionModel
            .getExchangePermissionsAndAfterByDatetime(permission.permissiondate)
        ])

       //console.log({ itemsReceivePermisisonList, itemsExchangePermisisonList })


        itemsReceivePermisisonList = itemsReceivePermisisonList.map(permission => {
            permission.type = 'receive'
            return permission
        })

        itemsExchangePermisisonList = itemsExchangePermisisonList.map(permission => {
            permission.type = 'exchange'
            return permission
        })

        const permissions = [...itemsReceivePermisisonList, ...itemsExchangePermisisonList]

        const receivePermissionsIds = extractPermissionsIds(itemsReceivePermisisonList)
        const exchangePermissionsIds = extractPermissionsIds(itemsExchangePermisisonList)

        //console.log({ receivePermissionsIds, exchangePermissionsIds })

        if(permissionType == 'receive') receivePermissionsIds.push(permission.permissionid)

        if(permissionType == 'exchange') exchangePermissionsIds.push(permission.permissionid)

        const unqiueReceivePermissionsIds = removeDuplicates(receivePermissionsIds)
        const uniqueExchangePermissionsIds = removeDuplicates(exchangePermissionsIds)


        const receivePermissionsPlaceholders = createDBPlaceholders(unqiueReceivePermissionsIds)
        const exchangePermissionsPlaceholders = createDBPlaceholders(uniqueExchangePermissionsIds)

        //console.log({ unqiueReceivePermissionsIds, uniqueExchangePermissionsIds })

        //console.log({ receivePermissionsPlaceholders, exchangePermissionsPlaceholders })

        let receivePermissionItems = []
        let exchangePermissionItems = []

        if(unqiueReceivePermissionsIds.length != 0) {

            receivePermissionItems = await receivePermissionItemModel
            .getItemsByPermissionsIds(receivePermissionsPlaceholders, unqiueReceivePermissionsIds) 
        }

        if(uniqueExchangePermissionsIds.length != 0) {

            exchangePermissionItems = await exchangePermissionItemModel
            .getItemsByPermissionsIds(exchangePermissionsPlaceholders, uniqueExchangePermissionsIds)
        }


        //console.log({ receivePermissionItems, exchangePermissionItems })

        const receivedItemsIds =  extractItemsIds(receivePermissionItems)
        const exchangedItemsIds = extractItemsIds(exchangePermissionItems)

        const unqiueReceivedItemsIds = removeDuplicates(receivedItemsIds)
        const unqiueExchangedItemsIds = removeDuplicates(exchangedItemsIds)

        //console.log({ unqiueReceivedItemsIds, unqiueExchangedItemsIds })

        const unqiueItemsIds = removeDuplicates([...unqiueReceivedItemsIds, ...unqiueExchangedItemsIds])

        //console.log(unqiueItemsIds)

        calculateItemsNewQuantityWithDate(unqiueItemsIds, permission.permissiondate)

        if(unqiueReceivePermissionsIds.length != 0) {

            const deleteReceivePermissionsItems = await receivePermissionItemModel
            .deleteReceivePermissionsItemsByPermissionsIds(receivePermissionsPlaceholders, unqiueReceivePermissionsIds)
            
            const deleteReceivePermissions = await receivePermissionModel
            .deleteReceivePermissionsByIds(receivePermissionsPlaceholders, unqiueReceivePermissionsIds)
        
        }

        if(uniqueExchangePermissionsIds.length != 0) {

            const deleteExchangePermissionsItems = await exchangePermissionItemModel
            .deleteExchangePermissionsItemsByPermissionIds(exchangePermissionsPlaceholders, uniqueExchangePermissionsIds)

            const deleteExchangePermissions = await exchangePermissionModel
            .deleteExchangePermissionsByIds(exchangePermissionsPlaceholders, uniqueExchangePermissionsIds)
        }
        

        return response.status(200).json({
            accepted: true,
            message: 'تمت العملية بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const editeReceivePermissionQuantity = async (request, response) => {

    try {

        const { receivePermissionItemId } = request.params
        const { newQuantity } = request.body

        if(!Number.isInteger(newQuantity)) return response.status(406).json({
            accepted: false,
            message: 'الكمية يجب ان تكون رقم',
            field: 'newQuantity'
        })

        if(newQuantity == 0) return response.status(406).json({
            accepted: false,
            message: 'الكمية يجب ان تكون اكبر من 0',
            field: 'newQuantity'
        })


        const permissionList = await receivePermissionItemModel.getReceivePermissionsItemsById(receivePermissionItemId)

        if(permissionList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'رقم الاذن غير صالح'
        })

        const permission = permissionList[0]
        const ITEM_PRICE = Number.parseInt(permission.price)

        if(permission.quantity == newQuantity) {

            return response.status(406).json({
                accepted: true,
                message: 'تمت العملية بنجاح',
                note: 'equal'
            })

        } else if(permission.quantity < newQuantity) {


            const updatePermission = await updateReceivePermissionQuantityAndBookValue(
                permission.permissionid,
                permission.permissionitemid,
                newQuantity,
                ITEM_PRICE
                )

            const updateItemQuantity = await calculateAndUpdateItemQuantity(permission.itemid)
            
            return response.status(200).json({
                accepted: true,
                message: 'تمت العملية بنجاح',
                note: 'more than'
            })

        } else {

            const currentItemQuantity = await getItemQuantityAtThatDate(permission.itemid, permission.permissiondate)

            let ITEM_QUANTITY = currentItemQuantity

            if(!ITEM_QUANTITY) ITEM_QUANTITY = 0

            let [receivedItemsAfter, exchangedItemsAfter] = await Promise.all([
                receivePermissionModel.getReceivePermissionsAfterPermissionDateThatIncludesItem(permission.permissiondate, permission.itemid),
                exchangePermissionModel.getExchangePermissionsAfterPermissionDateThatIncludesItem(permission.permissiondate, permission.itemid)
            ])

            receivedItemsAfter = receivedItemsAfter.map(permission => {
                permission.type = 'receive'
                return permission
            })

            exchangedItemsAfter = exchangedItemsAfter.map(permission => {
                permission.type = 'exchange'
                return permission
            })

            let permissions = [...receivedItemsAfter, ...exchangedItemsAfter]

            permissions = permissions.sort((permission1, permission2) => {

                const date1 = new Date(permission1.permissiondate)
                const date2 = new Date(permission2.permissiondate)

                return date1 - date2
            })

            //console.log(permissions)

            const EDITED_QUANTITY = ITEM_QUANTITY + newQuantity

            /*console.log({
                EDITED_QUANTITY,
                ITEM_QUANTITY,
                newQuantity
            })*/

            const permissionStatus = checkPermissionsQuantitiesAfterEdite(EDITED_QUANTITY, permissions)

            //console.log(permissionStatus)

            if(!permissionStatus.isAccepted) {

                return response.status(406).json({
                    accepted: false,
                    message: `هناك تعارض بسبب اذن صرف رقم ${permissionStatus.permission.permissionid}`
                })
            }

            const updatePermission = await updateReceivePermissionQuantityAndBookValue(
                permission.permissionid,
                permission.permissionitemid,
                newQuantity,
                ITEM_PRICE
            )

            const updateItemQuantity = await calculateAndUpdateItemQuantity(permission.itemid)

        }

        return response.status(200).json({
            accepted: true,
            message: 'تمت العملية بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const editeExchangePermissionQuantity = async (request, response) => {

    try {

        const { exchangePermissionItemId } = request.params
        const { newQuantity } = request.body

        if(!Number.isInteger(newQuantity)) return response.status(406).json({
            accepted: false,
            message: 'الكمية يجب ان تكون رقم',
            field: 'newQuantity'
        })

        if(newQuantity == 0) return response.status(406).json({
            accepted: false,
            message: 'الكمية يجب ان تكون اكبر من 0',
            field: 'newQuantity'
        })


        const permissionList = await exchangePermissionItemModel.getExchangePermissionsItemsById(exchangePermissionItemId)

        if(permissionList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'رقم الاذن غير صالح'
        })

        const permission = permissionList[0]
        const ITEM_PRICE = Number.parseInt(permission.price)

        if(permission.quantity == newQuantity) {

            return response.status(406).json({
                accepted: true,
                message: 'تمت العملية بنجاح',
                note: 'equal'
            })

        } else if(permission.quantity > newQuantity) {

            const updatePermission = await updateExchangePermissionQuantityAndBookValue(
                permission.permissionid,
                permission.permissionitemid,
                newQuantity,
                ITEM_PRICE
                )

            const updateItemQuantity = await calculateAndUpdateItemQuantity(permission.itemid)
            
            return response.status(200).json({
                accepted: true,
                message: 'تمت العملية بنجاح',
                note: 'more than'
            })

        } else {

            const currentItemQuantity = await getItemQuantityAtThatDate(permission.itemid, permission.permissiondate)

            let ITEM_QUANTITY = currentItemQuantity

            if(!ITEM_QUANTITY) ITEM_QUANTITY = 0

            let [receivedItemsAfter, exchangedItemsAfter] = await Promise.all([
                receivePermissionModel.getReceivePermissionsBeforePermissionDateThatIncludesItem(permission.permissiondate, permission.itemid),
                exchangePermissionModel.getExchangePermissionsBeforePermissionDateThatIncludesItem(permission.permissiondate, permission.itemid)
            ])

            receivedItemsAfter = receivedItemsAfter.map(permission => {
                permission.type = 'receive'
                return permission
            })

            exchangedItemsAfter = exchangedItemsAfter.map(permission => {
                permission.type = 'exchange'
                return permission
            })

            let permissions = [...receivedItemsAfter, ...exchangedItemsAfter]

            permissions = permissions.sort((permission1, permission2) => {

                const date1 = new Date(permission1.permissiondate)
                const date2 = new Date(permission2.permissiondate)

                return date1 - date2
            })

            //console.log(permissions)

            const EDITED_QUANTITY = ITEM_QUANTITY - newQuantity

            const permissionStatus = checkPermissionsQuantitiesAfterEdite(EDITED_QUANTITY, permissions)


            if(!permissionStatus.isAccepted) {

                return response.status(406).json({
                    accepted: false,
                    message: `الكمية المنصرفة المعدلة اكثر من الكمية الموجودة في ذالك التاريخ`
                })
            }

            const updatePermission = await updateExchangePermissionQuantityAndBookValue(
                permission.permissionid,
                permission.permissionitemid,
                newQuantity,
                ITEM_PRICE
            )

            const updateItemQuantity = await calculateAndUpdateItemQuantity(permission.itemid)
            
        }

        return response.status(200).json({
            accepted: true,
            message: 'تمت العملية بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const editeReceivePermissionPrice = async (request, response) => {

    try {

        const { receivePermissionItemId } = request.params
        const { newPrice } = request.body

        if(!Number.isInteger(newPrice)) {

            return response.status(406).json({
                accepted: false,
                message: 'السعر غير صالح',
                field: 'newwPrice'
            })
        }

        if(newPrice == 0) {

            return response.status(406).json({
                accepted: false,
                message: 'السعر غير صالح',
                field: 'newwPrice'
            })
        }

        const permissionList = await receivePermissionItemModel.getReceivePermissionsItemsById(receivePermissionItemId)

        if(permissionList.length == 0) {

            return response.status(406).json({
                accepted: false,
                message: 'لا يوجد صنف في الاذن بهذا المعرف',
                field: 'receivePermissionItemId'
            })
        }

        const permission = permissionList[0]

        if(permission.price == newPrice) {

            return response.status(200).json({
                accepted: true,
                message: 'تمت العملية بنجاح'
            })
        }

        let exchangedItemsAfter = await exchangePermissionModel
        .getExchangePermissionsAfterPermissionDateThatIncludesItem(permission.permissiondate, permission.itemid)

        exchangedItemsAfter = exchangedItemsAfter.map(permission => {
            permission.price = Number.parseInt(permission.price)
            return permission
        })
       

        const updatePermission = await updateReceivePermissionPriceAndBookValue(
            permission.permissionid,
            permission.permissionitemid,
            permission.quantity,
            newPrice
        )

        await updateItemsPrices(exchangedItemsAfter)


        return response.status(200).json({
            accepted: true,
            message: 'تمت العملية بنجاح'
        })


    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const deleteReceivePermissionItem = async (request, response) => {

    try {

        const { receivePermissionItemId } = request.params

        const permissionList = await receivePermissionItemModel.getReceivePermissionsItemsById(receivePermissionItemId)

        if(permissionList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'رقم الاذن غير صالح'
        })

        const permission = permissionList[0]

        const currentItemQuantity = await getItemQuantityAtThatDate(permission.itemid, permission.permissiondate)

        let ITEM_QUANTITY = currentItemQuantity

        if(!ITEM_QUANTITY) ITEM_QUANTITY = 0

        let [receivedItemsAfter, exchangedItemsAfter] = await Promise.all([
            receivePermissionModel.getReceivePermissionsAfterPermissionDateThatIncludesItem(permission.permissiondate, permission.itemid),
            exchangePermissionModel.getExchangePermissionsAfterPermissionDateThatIncludesItem(permission.permissiondate, permission.itemid)
        ])

        receivedItemsAfter = receivedItemsAfter.map(permission => {
            permission.type = 'receive'
            return permission
        })

        exchangedItemsAfter = exchangedItemsAfter.map(permission => {
            permission.type = 'exchange'
            return permission
        })

        let permissions = [...receivedItemsAfter, ...exchangedItemsAfter]

        permissions = permissions.sort((permission1, permission2) => {

            const date1 = new Date(permission1.permissiondate)
            const date2 = new Date(permission2.permissiondate)

            return date1 - date2
        })


        const permissionStatus = checkPermissionsQuantitiesAfterEdite(ITEM_QUANTITY, permissions)

        if(!permissionStatus.isAccepted) {

            return response.status(406).json({
                accepted: false,
                message: `هناك تعارض بسبب اذن صرف رقم ${permissionStatus.permission.permissionid}`
            })
        }


        const updatePermission = await deleteReceivePermissionItemAndUpdatePermission(
            permission.permissionid,
            permission.permissionitemid
        )

        const updateItemPrices = await updateItemsPrices(exchangedItemsAfter)
        
        const updateItemQuantity = await calculateAndUpdateItemQuantity(permission.itemid) 

        return response.status(200).json({
            accepted: true,
            message: 'تمت العملية بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const deleteExchangePermissionItem = async (request, response) => {

    try {

        const { exchangePermissionItemId } = request.params

        const permissionList = await exchangePermissionItemModel.getExchangePermissionsItemsById(exchangePermissionItemId)

        if(permissionList.length == 0) return response.status(406).json({
            accepted: false,
            message: 'رقم الاذن غير صالح'
        })

        const permission = permissionList[0]

        const updatePermission = await deleteExchangePermissionItemAndUpdatePermission(
            permission.permissionid,
            permission.permissionitemid
        )
        
        const updateItemQuantity = await calculateAndUpdateItemQuantity(permission.itemid) 

        return response.status(200).json({
            accepted: true,
            message: 'تمت العملية بنجاح'
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
    getExchangePermission,
    updateReceivePermissionProvider,
    updateExchangePermissionClient,
    getProviderPermissions,
    getClientPermissions,
    deletePermissiosAndUpdateItems,
    editeReceivePermissionQuantity,
    editeExchangePermissionQuantity,
    editeReceivePermissionPrice,
    deleteReceivePermissionItem,
    deleteExchangePermissionItem
 }