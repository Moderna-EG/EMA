const itemModel = require('../../models/inventory/Item')
const receivePermissionItemModel = require('../../models/inventory/ReceivePermissionItem')
const exchangePermissionItemModel = require('../../models/inventory/ExchangePermissionItem')
const providerModel = require('../../models/inventory/Provider')
const clientModel = require('../../models/inventory/Client')
const { joinReceivePermissionsByProviders, joinExchangePermissionsByClients } = require('../../utils/permissions-aggregation')


const addItemAveragesByTime = async (permissions) => {

    let currentQuantity = 0

    for(let i=0;i<permissions.length;i++) {

        let itemAveragePriceFunction = receivePermissionItemModel.getAveragePriceOfItemByDate
        let itemAverageBookValueFunction = receivePermissionItemModel.getAverageBookValueOfItemByDate

            const [itemAveragePrice, itemAverageBookValue] = await Promise.all([
                itemAveragePriceFunction(permissions[i].itemid, permissions[i].permissiondate),
                itemAverageBookValueFunction(permissions[i].itemid, permissions[i].permissiondate),
            ])
    
            const AVERAGE_PRICE = Math.trunc(itemAveragePrice[0].avg)
            const AVERAGE_BOOK_VALUE = Math.trunc(itemAverageBookValue[0].avg)

            if(permissions[i].permissiontype == 'receive') {

                const TOTAL_QUANTITY = permissions[i].receivepermissionquantity
                currentQuantity += TOTAL_QUANTITY

            } else if(permissions[i].permissiontype == 'exchange') {

                const TOTAL_QUANTITY = permissions[i].exchangepermissionquantity
                currentQuantity -= TOTAL_QUANTITY

            }    
    
            permissions[i].momentaverageprice = AVERAGE_PRICE
            permissions[i].momentaveragebookvalue = AVERAGE_BOOK_VALUE
            permissions[i].momenttotalquantity = Math.abs(currentQuantity)
        }

        return permissions
    }

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

        const itemAveragePrice = await receivePermissionItemModel.getAveragePriceOfItem(itemId)

        const AVERAGE_PRICE = Math.trunc(itemAveragePrice[0].avg)

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

        permissions = await addItemAveragesByTime(permissions)


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

const updateItem = async (request, response) => {

    try {

        const { itemId } = request.params

        const { itemName, itemCode } = request.body


        if(!itemName || !itemName.name) return response.status(406).json({
            accepted: false,
            message: 'اسم الصنف مطلوب',
            field: 'itemName'
        })

        const itemsNames = await itemModel.getItemByName(itemName.name)

        if(itemName.isNew) {

            if(itemsNames.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا اسم صنف اخر',
                field: 'itemName'
            }) 
            
        } else {

            if(itemsNames.length == 0 || (itemsNames.length == 1 && itemsNames[0].id != itemId)) return response.status(406).json({
                accepted: false,
                message: 'هذا ليس اسم الصنف الغير معدل',
                field: 'itemName'
            })
        }


        if(!itemCode || !itemCode.code) return response.status(406).json({
            accepted: false,
            message: 'كود الصنف مطلوب',
            field: 'itemCode'
        })

        if(!Number.isInteger(itemCode.code)) return response.status(406).json({
            accepted: false,
            message: 'كود الصنف يجب ان يكون رقم',
            field: 'itemCode'
        })

        const itemsCodes = await itemModel.getItemByCode(itemCode.code)

        if(itemCode.isNew) {
            if(itemsCodes.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا الكود مسجل مسبقا',
                field: 'itemCode'
            })

        } else {

            if(itemsCodes.length == 0 || (itemsCodes.length == 1 && itemsCodes[0].id != itemId)) return response.status(406).json({
                accepted: false,
                message: 'هذا ليس كود الصنف الغير معدل',
                field: 'itemCode'
            })
        }

        const updateItem = await itemModel.updateItemById(itemId, itemName.name, itemCode.code)

        return response.status(200).json({
            accepted: true,
            message: 'تم تعديل الصنف بنجاح'
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
    getItemCard,
    updateItem
}