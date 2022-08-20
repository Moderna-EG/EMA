const dbConnect = require('../../config/db')

class Provider {

    async addProvider(name, description, address, phone, code, paymentMethod) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO providers (name, description, address, phone, code, paymentMethod)
            VALUES ($1, $2, $3, $4, $5, $6)
            `
        const result = await pool.query(query, [name, description, address, phone, code, paymentMethod])
        await pool.end()

        return true
    }

    async getProviders() {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers`
        const result = await pool.query(query)
        await pool.end()

        return result.rows
    }

    async getProviderById(Id) {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers WHERE ID=$1`
        const result = await pool.query(query, [Id])
        await pool.end()

        return result.rows
    }

    async getProviderByCode(code) {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers WHERE code=$1`
        const result = await pool.query(query, [code])
        await pool.end()

        return result.rows
    }

    async getProviderByPhone(phone) {
        const pool = await dbConnect()
        const query = `SELECT * FROM providers WHERE phone=$1`
        const result = await pool.query(query, [phone])
        await pool.end()

        return result.rows
    }

    async updateProviderById(providerId, providerName, providerCode, providerDescription, providerPhone,providerAddress, providerPaymentMethod) {

        const pool = await dbConnect()
        const query = `UPDATE providers
        SET name=$2, code=$3, description=$4, phone=$5, address=$6, paymentMethod=$7
        WHERE ID = $1`
        const result = await pool.query(query, [providerId, providerName, providerCode, providerDescription, providerPhone, providerAddress, providerPaymentMethod])
        await pool.end()

        return true
    }

    async deleteProvider(providerId) {

        const pool = await dbConnect()
        const query = `DELETE FROM providers WHERE Id = $1`
        const result = await pool.query(query, [providerId])
        await pool.end()

        return true
    }

}

module.exports = new Provider()