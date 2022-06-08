
const jwt = require('jsonwebtoken')
const config = require('../config/config')


const generateToken = async (data) => {

    accessToken
    return jwt.sign(data, config.SECRET_KEY, { 'expiresIn': '30d' }, (err, token) => {
        if(err)
            console.error(error)
        
        accessToken = token
    })
    
}

module.exports = { generateToken }