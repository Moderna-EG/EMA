const config = require('../../config/config')
const usersModel = require('../../models/inventory/User')
const receivePermissionModel = require('../../models/inventory/ReceivePermission')
const exchangePermissionModel = require('../../models/inventory/ExchangePermission')
const { isUserRoleValid } = require('../../utils/validUserRole')
const { isEmailValid } = require('../../utils/validateEmail')
const { isPhoneValid } = require('../../utils/validatePhone')
const bcrypt = require('bcrypt')

const addUser = async (request, response) => {

    try {

        let { name, email, password, phone, role } = request.body

        if(!name) {
            return response.status(406).json({
                accepted: false,
                message: 'اسم الموظف مطلوب',
                field: 'name'
            })
        }

        if(!email) {
            return response.status(406).json({
                accepted: false,
                message: 'بريد الموظف مطلوب',
                field: 'email'
            })
        }

        if(!isEmailValid(email)) {

            return response.status(406).json({
                accepted: false,
                message: 'هذا البريد غير صالح',
                field: 'email'
            })
        }

        const similarEmails = await usersModel.getUserByEmail(email)

        if(similarEmails.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا البريد مسجل مسبقا',
                field: 'email'
            })
        }

        if(!password) {
            return response.status(406).json({
                accepted: false,
                message: 'كلمة المرور مطلوبة',
                field: 'password'
            })
        }

        if(!phone) {
            return response.status(406).json({
                accepted: false,
                message: 'هاتف الموظف مطلوب',
                field: 'phone'
            })
        }

        if(phone.length != 11) {
            return response.status(406).json({
                accepted: false,
                message: 'مطلوب 11 رقم',
                field: 'phone'
            })
        }

        if(!isPhoneValid(phone)) {
            return response.status(406).json({
                accepted: false,
                message: 'رقم غير صالح',
                field: 'phone'
            })
        }

        const similarPhons = await usersModel.getUserByPhone(phone)

        if(similarPhons.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا الرقم مسجل مسبقا',
                field: 'phone'
            })
        }

        if(!role) {
            return response.status(406).json({
                accepted: false,
                message: 'الدور مطلوب',
                field: 'role'
            })
        }

        if(!isUserRoleValid(role)) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا الدور غير صالح',
                field: 'role'
            })
        }

        password = bcrypt.hashSync(password, Number.parseInt(config.SALT_ROUNDS))

        const user = await usersModel.addUser(name, email, password, phone, role)

        return response.status(200).json({
            accepted: true,
            message: 'تم الاضافة بنجاح',
        })


    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getUsers = async (request, response) => {

    try {

        const users = await usersModel.getUsers()

        return response.status(200).json({
            accepted: true,
            users: users
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getEmployees = async (request, response) => {

    try {

        const employees = await usersModel.getUsersByRole('موظف')

        return response.status(200).json({
            accepted: true,
            employees
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const getAdmins = async (request, response) => {

    try {

        const admins = await usersModel.getUsersByRole('مالك')

        return response.status(200).json({
            accepted: true,
            admins
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const updateEmployee = async (request, response) => {

    try {

        const { employeeId } = request.params

        const { employeeName, employeePhone, employeeEmail } = request.body


        if(!employeeName || !employeeName.name) {
            return response.status(406).json({
                accepted: false,
                message: 'اسم الموظف مطلوب',
                field: 'employeeName'
            })
        }

        if(!employeeEmail || !employeeEmail.email) {
            return response.status(406).json({
                accepted: false,
                message: 'بريد الموظف مطلوب',
                field: 'employeeEmail'
            })
        }

        if(!isEmailValid(employeeEmail.email)) return response.status(406).json({
            accepted: false,
            message: 'هذا البريد غير صالح',
            field: 'employeeEmail'
        })

        const usersEmail = await usersModel.getUserByEmail(employeeEmail.email)

        if(employeeEmail.isNew) {

            if(usersEmail.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا البريد مسجل مسبقا',
                field: 'employeeMail'
            })

        } else {

            if(usersEmail.length == 0 || (usersEmail.length == 1 && usersEmail[0].id != employeeId)) {
                return response.status(406).json({
                    accepted: false,
                    message: 'هذا ليس بريد الموظف الغير معدل',
                    field: 'employeeEmail'
                })
            }
        }

        if(!employeePhone || !employeePhone.phone) {
            return response.status(406).json({
                accepted: false,
                message: 'هاتف الموظف مطلوب',
                field: 'employeePhone'
            })
        }

        if(!isPhoneValid(employeePhone.phone)) {
            return response.status(406).json({
                accepted: false,
                message: 'هذا ليس رقم هاتف صالح',
                field: 'employeePhone'
            })
        }

        if(employeePhone.phone.length != 11) return response.status(406).json({
            accepted: false,
            message: 'رقم الهاتف المدخل ليس 11 رقم',
            field: 'employeePhone'
        }) 

        const usersPhone = await usersModel.getUserByPhone(employeePhone.phone)

        if(employeePhone.isNew) {

            if(usersPhone.length != 0) return response.status(406).json({
                accepted: false,
                message: 'هذا هاتف مسجل مسبقا',
                field: 'employeePhone'
            })

        } else {

            if(usersPhone.length == 0 || (usersPhone.length == 1 && usersPhone[0].id != employeeId)) {
                return response.status(406).json({
                    accepted: false,
                    message: 'هذا ليس هاتف الموظف الغير معدل',
                    field: 'employeePhone'
                })
            }
        }

        const updateUser = await usersModel.updateUser(
            employeeId,
            employeeName.name,
            employeeEmail.email,
            employeePhone.phone
        )

        return response.status(200).json({
            accepted: true,
            message: 'تم تعديل الموظف بنجاح'
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const blockEmployee = async (request, response) => {

    try {

        const { employeeId } = request.params

        const updateEmployee = await usersModel.updateUserWorking(employeeId, false)

        return response.status(200).json({
            accepted: false,
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

const enableEmployee = async (request, response) => {

    try {

        const { employeeId } = request.params

        const updateEmployee = await usersModel.updateUserWorking(employeeId, true)

        return response.status(200).json({
            accepted: false,
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

const deleteEmployee = async (request, response) => {

    try {

        const { employeeId } = request.params

        const [receivePermissions, exchangePermissions] = await Promise.all([
            receivePermissionModel.getReceivePermissionsByUser(employeeId),
            exchangePermissionModel.getExchangePermissionsByUser(employeeId)
        ])

        if(receivePermissions.length != 0 || exchangePermissions.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'لا يمكن ازالة الموظف لوجود معاملات مسجلة به'
            })
        }

        const deleteUser = await usersModel.deleteUser(employeeId)

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
    addUser, 
    getUsers, 
    getEmployees, 
    getAdmins, 
    updateEmployee,
    blockEmployee,
    enableEmployee,
    deleteEmployee
 }