const jwt = require('jsonwebtoken')
const config = require('../config/config')

const verifyToken = (request, response, next) => {

    try {

        const token = request.headers['token']

        if(!token) {
            return response.status(401).json({
                accepted: false,
                message: 'you are unauthorized'
            })
        }

        jwt.verify(token, config.SECRET_KEY, (error, user) => {
            if(error) {
                console.error(error)
                return response.status(401).json({
                    accepted: false,
                    message: 'invalid token',
                    field: 'token'
                })
            }

            request.user = user.user
            next()
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}


const adminPermission = (request, response, next) => {

    try {

        verifyToken(request, response, () => {
            if(request.user.role == 'مالك') {
                
                next()

            } else {
                return response.status(403).json({
                    accepted: false,
                    message: 'you are unauthorized',
                    field: 'token'
                })
            }
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const adminAndEmployeePermission = (request, response, next) => {

    try {

        verifyToken(request, response, () => {

            if(request.user.role == 'مالك' || request.user.role == 'موظف') {
                next()
            } else {

                return response.status(403).json({
                    accepted: false,
                    message: 'you are unauthorized',
                    field: 'token'
                })
            }
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

module.exports = { adminPermission, adminAndEmployeePermission }
