const usersModel = require('../../models/inventory/User')
const { isUserRoleValid } = require('../../utils/validUserRole')

const addUser = async (request, response) => {

    try {

        const { name, email, password, phone, role } = request.body

        if(!name) {
            return response.status(406).json({
                accepted: false,
                message: 'user name is required'
            })
        }

        if(!email) {
            return response.status(406).json({
                accepted: false,
                message: 'user email is required'
            })
        }

        const similarEmails = await usersModel.getUserByEmail(email)

        if(similarEmails.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'user email is already registered'
            })
        }

        if(!password) {
            return response.status(406).json({
                accepted: false,
                message: 'user email is required'
            })
        }

        if(!phone) {
            return response.status(406).json({
                accepted: false,
                message: 'user phone is required'
            })
        }

        const similarPhons = await usersModel.getUserByPhone(phone)

        if(similarPhons.length != 0) {
            return response.status(406).json({
                accepted: false,
                message: 'user phone is already registered'
            })
        }

        if(!role) {
            return response.status(406).json({
                accepted: false,
                message: 'user role is required'
            })
        }

        if(!isUserRoleValid(role)) {
            return response.status(406).json({
                accepted: false,
                message: 'invalid user role'
            })
        }

        const user = await usersModel.addUser(name, email, password, phone, role)

        return response.status(200).json({
            accepted: true,
            message: 'user added successfully'
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

module.exports = { addUser, getUsers }