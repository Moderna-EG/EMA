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

module.exports = { addClient, getClients }