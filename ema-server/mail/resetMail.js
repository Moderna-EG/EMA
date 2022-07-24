const config = require('../config/config')
const nodemailer = require('nodemailer')


const sendResetMail = async (receiverMail, receiverName, receiverToken) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.USER_MAIL,
          pass: config.MAIL_PASSWORD
        }
      })

      let mailOptions = {
        from: config.USER_MAIL,
        to: receiverMail,
        subject: 'Password Reset',
        html: `
        <div>
            <p>Hi ${receiverName},</p>
            <p>To reset your password please click <a href=${config.HOST_URL}/reset-password/${receiverToken}>Here</a></p>
        </div>
        `
      }


      try {

        const mail = await transporter.sendMail(mailOptions)

        console.log(mail)

        return true

      } catch(error) {
        console.error(error)
        return false
      }

    
}

module.exports = { sendResetMail }