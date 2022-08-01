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
        subject: 'تغيير كلمة المرور',
        html: `
        <div style="text-align: right;">
            <p>السيد ${receiverName}</p>
            <p>لتغيير كلمة المرور اضغط <a href=${config.HOST_URL}/reset-password/${receiverToken}>هنا</a></p>
        </div>
        `
      }


      try {

        const mail = await transporter.sendMail(mailOptions)

        return true

      } catch(error) {
        console.error(error)
        return false
      }

    
}

module.exports = { sendResetMail }