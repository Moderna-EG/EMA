const dbConnect = require('../../config/db')

class ExchangePermission {
    
    async addExchangePermission(itemId, clientId, userId, quantity, price, bookValue) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ExchangePermissions (itemId, clientId, userId, quantity, price, bookValue)
            VALUES ($1, $2, $3, $4, $5, $6)`
        const client = await pool.connect()
        const result = await client.query(query, [itemId, clientId, userId, quantity, price, bookValue])
        client.release()

        return true
    }

    async getExchangePermissions() {

        const pool = await dbConnect()
        const query = `
            SELECT
            items.name AS ItemName, items.code AS ItemCode,
            clients.name AS ClientName, clients.code AS ClientCode,
            users.name AS Username, users.ID AS UserId,
            ExchangePermissions.quantity, ExchangePermissions.price, ExchangePermissions.bookValue, ExchangePermissions.permissionDate
            FROM ExchangePermissions
            INNER JOIN items ON items.ID = ExchangePermissions.ItemId
            INNER JOIN clients ON clients.ID = ExchangePermissions.clientId
            INNER JOIN users ON users.ID = ExchangePermissions.userId
            ORDER BY ExchangePermissions.permissionDate DESC
        `
        const client = await pool.connect()
        const data = await client.query(query)
        client.release()

        return data.rows
        
    }

}

module.exports = new ExchangePermission()