const { response } = require('express')
const providerModel = require('../../models/inventory/Provider')
const receivePermissionModel = require('../../models/inventory/ReceivePermission')
const { isPaymentMethod } = require('../../utils/validPaymentMethod')
const { isPhoneValid } = require('../../utils/validatePhone')

const addProvider = async (request, response) => {

    try {

        const { name, description, code, address, phone, paymentMethod } = request.body

        if(!name) {
            return response.status(406).json({
                accepted: false,
                message: 'اسم المورد مطلوب',
                field: 'name'
            })
        }

        if(!description) {
            return response.status(406).json({
                accepted: false,
                message: 'وصف المورد مطلوب',
                field: 'description'
            })
        }

        if(!code) {
            return response.status(406).json({
                accepted: false,
                message: 'كود المورد مطلوب',
                field: 'code'
            })
        }

        if(!Number.isInteger(code)) {
            return response.status(406).json({
                accepted: false,
                message: 'كود المورد يجب ان يكون رقم',
                field: 'code'
            })
        }

        const providerByCode = await providerModel.getProviderByCode(code)

        if(providerByCode.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا كود مورد اخر',
                field: 'code'
            })
        }

        if(!address) {
            return response.status(406).json({
                accepted: false,
                message: 'عنوان المورد مطلوب',
                field: 'address'
            })
        }

        if(!phone) {
            return response.status(406).json({
                accepted: false,
                message: 'هاتف المورد مطلوب',
                field: 'phone'
            })
        }

        if(phone.length != 11) {
            return response.status(406).json({
                accepted: false,
                message: 'رقم الهاتف يجب ان يكون 11 رقم',
                field: 'phone'
            })
        }


        const providerByPhone = await providerModel.getProviderByPhone(phone)

        if(providerByPhone.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا رقم مورد اخر',
                field: 'phone'
            })
        }

        if(!paymentMethod) {
            return response.status(406).json({
                accepted: false,
                message: 'طريقة دفع المورد مطلوبة',
                field: 'paymentMethod'
            })
        }

        if(!isPaymentMethod(paymentMethod)) {
            return response.status(406).json({
                accepted: false,
                message: 'طريقة الدفع المدخلة غير مقبولة',
                field: 'paymentMethod'
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

const updateProvider = async (request, response) => {

    try {

        const { providerId } = request.params

        const { providerName, providerCode, providerDescription, providerPhone, providerAddress, providerPaymentMethod } = request.body


        if(!providerName || !providerName.name) return response.status(406).json({
            accepted: false,
            message: 'اسم المورد مطلوب',
            field: 'providerName'
        })


        if(!providerCode || !providerCode.code) return response.status(406).json({
            accepted: false,
            message: 'كود المورد مطلوب',
            field: 'providerCode'
        })

        if(!Number.isInteger(providerCode.code)) return response.status(406).json({
            accepted: false,
            message: 'كود المورد يجب ان يكون رقم',
            field: 'providerCode'
        })

        const providersCode = await providerModel.getProviderByCode(providerCode.code)

        if(providerCode.isNew) {
            if(providersCode.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا كود مورد اخر',
                field: 'providerCode'
            })

        } else {

            if(providersCode.length == 0 || (providersCode.length == 1 && providersCode[0].id != providerId)) {
                return response.status(406).json({
                    accepted: false,
                    message: 'هذا ليس كود المورد الغير معدل',
                    field: 'providerCode'
                })
            }

        }

        if(!providerDescription || !providerDescription.description) return response.status(406).json({
            accepted: false,
            message: 'وصف المورد مطلوب',
            field: 'providerDescription'
        })

        if(!providerPhone || !providerPhone.phone) return response.status(406).json({
            accepted: false,
            message: 'هاتف المورد مطلوب',
            field: 'providerPhone'
        })

        if(providerPhone.phone.length != 11) return response.status(406).json({
            accepted: false,
            message: 'هاتف المورد يجب ان يكون 11 رقم',
            field: 'providerPhone'
        })

        if(!isPhoneValid(providerPhone.phone)) return response.status(406).json({
            accepted: false,
            message: 'هاتف المورد يجب ان يحتوي علي ارقام فقط',
            field: 'providerPhone'
        })

        const providersPhones = await providerModel.getProviderByPhone(providerPhone.phone)

        if(providerPhone.isNew) {
            if(providersPhones.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا رقم هاتف مورد اخر',
                field: 'providerPhone'
            })

        } else {

            if(providersPhones.length == 0 || (providersPhones.length == 1 && providersPhones[0].id != providerId)) {
                return response.status(406).json({
                    accepted: false,
                    message: 'هذا ليس رقم هاتف المورد الغير معدل',
                    field: 'providerPhone'
                })
            }

        }


        if(!providerAddress || !providerAddress.address) return response.status(406).json({
            accepted: false,
            message: 'عنوان المورد مطلوب',
            field: 'providerAddress'
        })

        if(!providerPaymentMethod || !providerPaymentMethod.paymentMethod) return response.status(406).json({
            accepted: false,
            message: 'طريقة دفع المورد مطلوبة',
            field: 'providerPaymentMethod'
        })

        if(!isPaymentMethod(providerPaymentMethod.paymentMethod)) return response.status(406).json({
            accepted: false,
            message: 'طريقة دفع المورد المدخلة غير مقبولة',
            field: 'providerPaymentMethod'
        })

        const updateProvider = await providerModel.updateProviderById(
            providerId,
            providerName.name,
            providerCode.code,
            providerDescription.description,
            providerPhone.phone,
            providerAddress.address,
            providerPaymentMethod.paymentMethod
        )

        return response.status(200).json({
            accepted: true,
            message: 'تم تعديل المورد بنجاح'
        })


    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}


module.exports = { addProvider, getProviders, updateProvider }