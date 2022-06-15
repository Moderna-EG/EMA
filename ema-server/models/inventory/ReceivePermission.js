const dbConnect = require('../../config/db')

class ReceivePermission {
    
    async addReceivePermission(providerId, userId, totalValue, permissionDate) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ReceivePermissions (providerId, userId, totalValue, permissionDate)
            VALUES ($1, $2, $3, $4)`
        const client = await pool.connect()
        const result = await client.query(query, [providerId, userId, totalValue, permissionDate])
        client.release()

        return true
    }

    async getReceivePermissionByMainData(providerId, userId, permissionDate) {

        const pool = await dbConnect()
        const query = `SELECT * FROM ReceivePermissions WHERE ProviderId=$1 AND UserId=$2 AND PermissionDate=$3`
        const client = await pool.connect()
        const result = await client.query(query, [providerId, userId, permissionDate])
        client.release()

        return result.rows
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