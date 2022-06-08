const userModel = require('../../models/inventory/User')
const config = require('../../config/config')
const jwt = require('jsonwebtoken')

const   loginUser = async (request, response) => {

    try {

        const { email, password } = request.body

        if(!email) {
            return response.status(406).json({
                accepted: false,
                message: 'user email is required',
                field: 'email'
            })
        }

        const user = await userModel.getUserByEmail(email)

        if(user.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'invalid email',
                field: 'email'
            })
        }

        const USER_PASSWORD = user[0].password

        if(USER_PASSWORD != password) {
            return response.status(406).json({
                accepted: false,
                message: 'invalid credentials',
                field: 'password'
            })
        }

        const token = jwt.sign({ user: user[0] }, config.SECRET_KEY, { 'expiresIn': '30d' })

        user[0].password = ''

        return response.status(200).json({
            accepted: true,
            token: token,
            user: user[0]
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

module.exports = { loginUser }