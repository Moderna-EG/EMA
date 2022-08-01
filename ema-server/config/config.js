module.exports = {
    PORT: 5000,
    HOST_URL: '137.184.116.235:3000',
    DB: {
        USER: process.env.USER_DB,
        HOST: process.env.HOST_DB,
        DATABASE: process.env.DATABASE,
        PASSWORD: process.env.PASSWORD_DB,
        PORT: process.env.PORT_DB
    },

    PAYMENT_METHOD: ['كاش', 'اجل'],
    ROLES: ['موظف', 'مالك'],
    SECRET_KEY: process.env.SECRET_KEY,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    USER_MAIL: 'emaappeg@gmail.com',
    SALT_ROUNDS: process.env.SALT_ROUNDS
}