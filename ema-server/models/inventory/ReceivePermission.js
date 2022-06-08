const dbConnect = require('../../config/db')

class ReceivePermission {
    
    async addReceivePermission(itemId, providerId, userId, quantity, price, bookValue) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ReceivePermissions (itemId, providerId, userId, quantity, price, bookValue)
            VALUES ($1, $2, $3, $4, $5, $6)`
        const client = await pool.connect()
        const result = await client.query(query, [itemId, providerId, userId, quantity, price, bookValue])
        client.release()

        return true
    }

    async getReceivePermissions() {

        const pool = await dbConnect()
        const query = `
            SELECT
            items.name AS ItemName, items.code AS ItemCode,
            providers.name AS ProviderName, providers.code AS ProviderCode,
            users.name AS Username, users.ID AS UserId,
            ReceivePermissions.quantity, ReceivePermissions.price, ReceivePermissions.bookValue, ReceivePermissions.permissionDate
            FROM ReceivePermissions
            INNER JOIN items ON items.ID = ReceivePermissions.ItemId
            INNER JOIN providers ON providers.ID = ReceivePermissions.ProviderId
            INNER JOIN users ON users.ID = ReceivePermissions.userId
            ORDER BY ReceivePermissions.permissionDate DESC
        `
        const client = await pool.connect()
        const data = await client.query(query)
        client.release()

        return data.rows
        
    }

}

module.exports = new ReceivePermission()