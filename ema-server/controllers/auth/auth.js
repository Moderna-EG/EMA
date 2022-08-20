const userModel = require('../../models/inventory/User')
const config = require('../../config/config')
const jwt = require('jsonwebtoken')
const { sendResetMail } = require('../../mail/resetMail')
const bcrypt = require('bcrypt')

const loginUser = async (request, response) => {

    try {

        const { email, password } = request.body

        if(!email) {
            return response.status(406).json({
                accepted: false,
                message: 'البريد الإلكتروني للمستخدم مطلوب',
                field: 'email'
            })
        }

        const user = await userModel.getUserByEmail(email)

        if(user.length == 0) {
            return response.status(406).json({
                accepted: false,
                message: 'بريد إلكتروني خاطئ',
                field: 'email'
            })
        }


        if(!user[0].isworking) return response.status(406).json({
            accepted: false,
            message: 'غير مسموح لك بلدخول',
            field: 'authorization'
        })

        const USER_PASSWORD = user[0].password

        if(!bcrypt.compareSync(password, USER_PASSWORD)) {
            return response.status(406).json({
                accepted: false,
                message: 'كلمة السر خاطئة',
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

const sendForgetPasswordMail = async (request, response) => {

    try {

        const { email } = request.params

        const users = await userModel.getUserByEmail(email)

        if(users.length == 0) return response.status(406).json({
            accepted: false,
            message: 'هذا البريد غير مسجل',
            field: 'email'
        })

        const user = users[0]

        const userData = jwt.sign({ userId: user.id }, config.SECRET_KEY, { expiresIn: '1h' })

        const isSent = await sendResetMail(user.email, user.name, userData)

        if(!isSent) {
            return response.status(406).json({
                accepted: false,
                message: 'هناك مشكلة في ذالك البريد',
                field: 'gmail'
            })
        }


        return response.status(200).json({
            accepted: true,
            message: 'تم ارسال البريد ',
            token: userData
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}

const updatePassword = async (request, response) => {

    try {

        const { token } = request.params

        const { newPassword } = request.body

        if(!newPassword) return response.status(406).json({
            accepted: false,
            message: 'كلمة المرور مطلوبة',
            field: 'newPassword'
        })
        
        jwt.verify(token, config.SECRET_KEY, async (error, user) => {

            if(error)
                return response.status(406).json({
                    accepted: false,
                    message: 'غير صالح'
                })

            const hashedPassword = bcrypt.hashSync(newPassword, Number.parseInt(config.SALT_ROUNDS))
            const updatePassword = await userModel.updatePassword(user.userId, hashedPassword)

            return response.status(200).json({
                accepted: true,
                message: 'تم تعديل كلمة المرور بنجاح'
            })
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            accepted: false,
            message: 'internal server error'
        })
    }
}


module.exports = { loginUser, sendForgetPasswordMail, updatePassword }