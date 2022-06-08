const { Pool } = require('pg')
const config = require('./config')

module.exports = async () => {
    const pool = new Pool({
        user: 'reda',
        host: 'localhost',
        database: 'ema',
        password: 'reda77',
        port: 5432
    })

    return pool
}