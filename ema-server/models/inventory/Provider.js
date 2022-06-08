const dbConnect = require('../../config/db')

class Provider {

    async addProvider(name, description, address, phone, code, paymentMethod) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO providers (name, description, address, phone, code, paymentMethod)
            VALUES ($1, $2, $3, $4, $5, $6)
            `
        const client = await pool.connect()
        const result = await client.query(query, [name, description, address, phone, code, paymentMethod])
        client.release()

        return true
    }

    async getProviders() {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers`
        const client = await pool.connect()
        const result = await client.query(query)
        client.release()

        return result.rows
    }

    async getProviderById(Id) {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers WHERE ID=$1`
        const client = await pool.connect()
        const result = await client.query(query, [Id])
        client.release()

        return result.rows
    }

    async getProviderByCode(code) {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers WHERE code=$1`
        const client = await pool.connect()
        const result = await client.query(query, [code])
        client.release()

        return result.rows
    }

    async getProviderByPhone(phone) {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers WHERE phone=$1`
        const client = await pool.connect()
        const result = await client.query(query, [phone])
        client.release()

        return result.rows
    }

}

module.exports = new Provider()