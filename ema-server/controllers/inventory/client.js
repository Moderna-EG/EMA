const clientModel = require('../../models/inventory/Client')
const exchangePermissionModel = require('../../models/inventory/ExchangePermission')
const exchangePermissionItemModel = require('../../models/inventory/ExchangePermissionItem')
const itemModel = require('../../models/inventory/Item')
const moment = require('moment')
const { createDBPlaceholders } = require('../../utils/DBPlaceholders')
const { extractItemsIds } = require('../../utils/extractItemIds')
const { joinItemsByIds } = require('../../utils/join-items')

const addClient = async (request, response) => {

    try {

        const { name, description, code, operationDate } = request.body

        if(!name) {
            return response.status(406).json({
                accepted: false,
                message: 'اسم العميل مطلوب',
                field: 'name'
            })
        }

        if(!description) {
            return response.status(406).json({
                accepted: false,
                message: 'وصف العميل مطلوب',
                field: 'description'
            })
        }

        if(!code) {
            return response.status(406).json({
                accepted: false,
                message: 'كود العميل مطلوب',
                field: 'code'
            })
        }

        if(!Number.isInteger(code)) {
            return response.status(406).json({
                accepted: false,
                message: 'كود غير صالح',
                field: 'code'
            })
        }

        const similarCodes = await clientModel.getClientByCode(code)

        if(similarCodes.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'كود عميل اخر',
                field: 'code'
            })
        }

        if(!operationDate) {
            return response.status(406).json({
                accepted: false,
                message: 'تاريخ التعامل مع العميل مطلوب',
                field: 'operationDate'
            })
        }

        const isValidDate = moment(operationDate, 'YYYY-MM-DD', true).isValid()

        if(!isValidDate) {
            return response.status(406).json({
                accepted: false,
                message: 'تاريخ العمل مع العميل غير صالح',
                field: 'operationDate'
            })
        }

        const client = await clientModel.addClient(name, description, code, new Date(operationDate))

        return response.status(200).json({
            accepted: true,
            message: 'تم اضافة العميل بنجاح',
        })
         
    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getClients = async (request, response) => {

    try {

        const clients = await clientModel.getClients()

        return response.status(200).json({
            accepted: true,
            clients: clients
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const updateClient = async (request, response) => {

    try {

        const { clientId } = request.params

        const { clientName, clientCode, clientDescription, clientOperationDate } = request.body

        if(!clientName || !clientName.name) return response.status(406).json({
            accepted: false,
            message: 'اسم العميل مطلوب',
            field: 'clientName'
        })

        const clientsNames = await clientModel.getClientByName(clientName.name)
        if(clientName.isNew) {

            if(clientsNames.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا اسم عميل اخر',
                field: 'clientName'
            })
        } else {

            if(clientsNames.length == 0 || (clientsNames.length == 1 && clientsNames[0].id != clientId)){

                return response.status(406).json({
                    accepted: false,
                    message: 'هذا ليس اسم العميل الغير معدل',
                    field: 'clientName'
                }) 
            }
        }

        if(!clientCode || !clientCode.code) return response.status(406).json({
            accepted: false,
            message: 'كود العميل مطلوب',
            field: 'clientCode'
        })

        if(!Number.isInteger(clientCode.code)) return response.status(406).json({
            accepted: false,
            message: 'كود العميل يجب ان يكون رقم',
            field: 'clientCode'
        })

        const clientsCodes = await clientModel.getClientByCode(clientCode.code)

        if(clientCode.isNew) {

            if(clientsCodes.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا كود عميل اخر',
                field: 'clientCode'
            })
        } else {

            if(clientsCodes.length == 0 || (clientsCodes.length == 1 && clientsCodes[0].id != clientId)) return response.status(406).json({
                accepted: false,
                message: 'هذا ليس كود العميل الغير معدل',
                field: 'clientCode'
            }) 
        }

        if(!clientDescription || !clientDescription.description) return response.status(406).json({
            accepted: false,
            message: 'وصف العميل مطلوب',
            field: 'clientDescription'
        })

        if(!clientOperationDate || !clientOperationDate.operationDate) return response.status(406).json({

            accepted: false,
            message: 'تاريخ العمل مع العميل مطلوب',
            field: 'clientOperationDate'
        })

        const isValidDate = moment(clientOperationDate.operationDate, 'MM-DD-YYYY', true).isValid()

        if(!isValidDate) return response.status(406).json({
            accepted: false,
            message: 'تاريخ التعامل مع العميل غير صالح',
            field: 'clientOperationDate'
        }) 

        clientOperationDate.operationDate = new Date(clientOperationDate.operationDate)
        
        const updateClient = await clientModel.updateClientById(
            clientId,
            clientName.name,
            clientCode.code,
            clientDescription.description,
            clientOperationDate.operationDate
        )

        return response.status(200).json({
            accepted: true,
            message: 'تم تعديل العميل بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const deleteClient = async (request, response) => {

    try {

        const { clientId } = request.params

        const clientsList = await exchangePermissionModel.getExchangePermissionsByClient(clientId)
        
        if(clientsList.length != 0) {
            
            return response.status(406).json({
                accepted: false,
                message: 'لا يمكن ازالة العميل لوجود معاملات مسجلة به'
            })
        }

        const deleteClient = await clientModel.deleteClient(clientId)

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

const getClientItemsStats = async (request, response) => {

    try {

        const { clientId } = request.params

        const items = await exchangePermissionItemModel.getClientItemsStats(clientId)

        if(items.length == 0) return response.status(200).json({
            accepted: true,
            items: []
        }) 

        const itemsIds = extractItemsIds(items)
        const placeholders = createDBPlaceholders(itemsIds)

        let itemsData = await itemModel.getItemsByIds(placeholders, itemsIds)

        itemsData = joinItemsByIds(itemsData, items) 

        return response.status(200).json({
            accepted: true,
            items: itemsData
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getClientItemsStatsByDates = async (request, response) => {

    try {

        const { clientId, fromDate, toDate } = request.params

        const isFromDateValid = moment(fromDate, 'YYYY-MM-DD', true).isValid()

        if(!isFromDateValid) return response.status(406).json({
            accepted: false,
            message: 'التاريخ غير صالح',
            field: 'fromDate'
        })

        const isToDateValid = moment(toDate, 'YYYY-MM-DD', true).isValid()

        if(!isToDateValid) return response.status(406).json({
            accepted: false,
            message: 'التاريخ غير صالح',
            field: 'toDate'
        })

        const items = await exchangePermissionItemModel
        .getClientItemsStatsByDates(clientId, fromDate, toDate)

        if(items.length == 0) return response.status(200).json({
            accepted: true,
            items: []
        }) 

        const itemsIds = extractItemsIds(items)
        const placeholders = createDBPlaceholders(itemsIds)

        let itemsData = await itemModel.getItemsByIds(placeholders, itemsIds)

        itemsData = joinItemsByIds(itemsData, items) 

        return response.status(200).json({
            accepted: true,
            items: itemsData
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
    addClient, 
    getClients, 
    updateClient, 
    deleteClient,
    getClientItemsStats,
    getClientItemsStatsByDates
}