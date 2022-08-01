const clientModel = require('../../models/inventory/Client')
const exchangePermissionModel = require('../../models/inventory/ExchangePermission')
const moment = require('moment')

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

        console.log(operationDate)

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
            message: 'client added successfully',
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

module.exports = { addClient, getClients, updateClient, deleteClient }