const jwt = require('jsonwebtoken')
const config = require('../config/config')

const verifyToken = (request, response, next) => {

    try {

        const token = request.headers['token']

        if(!token) {
            return response.status(403).json({
                accepted: false,
                message: 'you are unauthorized'
            })
        }

        jwt.verify(token, config.SECRET_KEY, (error, user) => {
            if(error) {
                console.error(error)
            }

            request.user = user
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


const verifyTokenandAdminAuthorization = (request, response, next) => {

    try {

        verifyToken(request, response, () => {
            if(request.user.role != 'مالك') {
                return response.status(403).json({
                    accepted: false,
                    message: 'you are unauthorized'
                })
            }

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

module.exports = { verifyToken, verifyTokenandAdminAuthorization }
