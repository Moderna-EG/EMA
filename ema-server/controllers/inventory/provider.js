const { response } = require('express')
const providerModel = require('../../models/inventory/Provider')
const { isPaymentMethod } = require('../../utils/validPaymentMethod')

const addProvider = async (request, response) => {

    try {

        const { name, description, code, address, phone, paymentMethod } = request.body

        if(!name) {
            return response.status(406).json({
                accepted: false,
                message: 'provider name is required'
            })
        }

        if(!description) {
            return response.status(406).json({
                accepted: false,
                message: 'provider description is required'
            })
        }

        if(!code) {
            return response.status(406).json({
                accepted: false,
                message: 'provider code is required'
            })
        }

        if(!Number.isInteger(code)) {
            return response.status(406).json({
                accepted: false,
                message: 'invalid provider code'
            })
        }

        const providerByCode = await providerModel.getProviderByCode(code)

        if(providerByCode.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'this provider code is already registered'
            })
        }

        if(!address) {
            return response.status(406).json({
                accepted: false,
                message: 'provider address is required'
            })
        }

        if(!phone) {
            return response.status(406).json({
                accepted: false,
                message: 'provider phone is required'
            })
        }

        const providerByPhone = await providerModel.getProviderByPhone(phone)

        if(providerByPhone.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'this provider phone is already registered'
            })
        }

        if(!paymentMethod) {
            return response.status(406).json({
                accepted: false,
                message: 'payment method is required'
            })
        }

        if(!isPaymentMethod(paymentMethod)) {
            return response.status(406).json({
                accepted: false,
                message: 'invalid payment method'
            })
        }

        const provider = await providerModel.addProvider(
            name,
            description,
            address,
            phone,
            code,
            paymentMethod
        )

        return response.status(200).json({
            accepted: true,
            message: 'provider added successfully'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getProviders = async (request, response) => {

    try {

        const providers = await providerModel.getProviders()

        return response.status(200).json({
            accepted: true,
            providers: providers
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

module.exports = { addProvider, getProviders }