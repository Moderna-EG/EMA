module.exports = {
    PORT: 5000,
    DB: {
        USER: process.env.USER_DB,
        HOST: process.env.HOST_DB,
        DATABASE: process.env.DATABASE,
        PASSWORD: process.env.PASSWORD_DB,
        PORT: process.env.PORT_DB
    },

    PAYMENT_METHOD: ['كاش', 'اجل'],
    ROLES: ['موظف', 'مالك'],
    SECRET_KEY: 'BOEBG33H53HBOEWV6647GO4J266H6H./EFE4;G4GEFW',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    USER_MAIL: 'emaappeg@gmail.com',
    SALT_ROUNDS: process.env.SALT_ROUNDS
}