const clientModel = require('../../models/inventory/Client')

const addClient = async (request, response) => {

    try {

        const { name, description, code, operationDate } = request.body

        if(!name) {
            return response.status(406).json({
                accepted: false,
                message: 'client name is required'
            })
        }

        if(!description) {
            return response.status(406).json({
                accepted: false,
                message: 'client description is required'
            })
        }

        if(!code) {
            return response.status(406).json({
                accepted: false,
                message: 'client code is required'
            })
        }

        if(!Number.isInteger(code)) {
            return response.status(406).json({
                accepted: false,
                message: 'invalid client code'
            })
        }

        const similarCodes = await clientModel.getClientByCode(code)

        if(similarCodes.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'this code is already registered'
            })
        }

        if(!operationDate instanceof Date) {
            return response.status(406).json({
                accepted: false,
                message: 'client operation date is required'
            })
        }

        const client = await clientModel.addClient(name, description, code, operationDate)

        return response.status(200).json({
            accepted: true,
            message: 'client added successfully'
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

        const { clientName, clientCode, clientDescription } = request.body

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

        const updateClient = await clientModel.updateClientById(
            clientId,
            clientName.name,
            clientCode.code,
            clientDescription.description
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

module.exports = { addClient, getClients, updateClient }