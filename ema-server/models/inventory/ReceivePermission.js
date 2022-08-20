const dbConnect = require('../../config/db')

class ReceivePermission {
    
    async addReceivePermission(providerId, userId, totalValue, permissionDate) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ReceivePermissions (providerId, userId, totalValue, permissionDate)
            VALUES ($1, $2, $3, $4)`
        const result = await pool.query(query, [providerId, userId, totalValue, permissionDate])
        await pool.end()

        return true
    }

    async getReceivePermissionByMainData(providerId, userId, permissionDate) {

        const pool = await dbConnect()
        const query = `SELECT * FROM ReceivePermissions WHERE ProviderId=$1 AND UserId=$2 AND PermissionDate=$3`
        const result = await pool.query(query, [providerId, userId, permissionDate])
        await pool.end()

        return result.rows
    }

    /*async getReceivePermissions() {

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
        const pool = await pool.connect()
        const data = await pool.query(query)
        await pool.end()

        return data.rows
        
    }*/

    async getReceivePermissions() {
        const pool = await dbConnect()
        const query = `
            SELECT
            ReceivePermissions.ID AS PermissionId,
            providers.name AS ProviderName, providers.code AS ProviderCode,
            users.name AS UserName,
            ReceivePermissions.totalValue, ReceivePermissions.permissionDate
            FROM ReceivePermissions
            INNER JOIN providers ON providers.ID = ReceivePermissions.providerId
            INNER JOIN users ON users.ID = ReceivePermissions.userId
            ORDER BY ReceivePermissions.ID DESC
        `
        const result = await pool.query(query, [])
        await pool.end()

        return result.rows
    }

    async getReceivePermissionsByUser(userId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ReceivePermissions.ID AS PermissionId,
            providers.name AS ProviderName, providers.code AS ProviderCode,
            users.name AS UserName,
            ReceivePermissions.totalValue, ReceivePermissions.permissionDate
            FROM ReceivePermissions
            INNER JOIN providers ON providers.ID = ReceivePermissions.providerId
            INNER JOIN users ON users.ID = ReceivePermissions.userId
            WHERE ReceivePermissions.userId = $1
            ORDER BY ReceivePermissions.ID DESC
        `
        const result = await pool.query(query, [userId])
        await pool.end()

        return result.rows
    }

    async getReceivePermissionsByProvider(providerId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ReceivePermissions.ID AS PermissionId,
            providers.name AS ProviderName, providers.code AS ProviderCode,
            users.name AS UserName,
            ReceivePermissions.totalValue, ReceivePermissions.permissionDate
            FROM ReceivePermissions
            INNER JOIN providers ON providers.ID = ReceivePermissions.providerId
            INNER JOIN users ON users.ID = ReceivePermissions.userId
            WHERE ReceivePermissions.providerId = $1
            ORDER BY ReceivePermissions.ID DESC
        `
        const result = await pool.query(query, [providerId])
        await pool.end()

        return result.rows
    }

    async getReceivePermission(permissionId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ReceivePermissions.ID AS PermissionId,
            providers.name AS ProviderName, providers.code AS ProviderCode,
            users.name AS UserName,
            ReceivePermissions.totalValue, ReceivePermissions.permissionDate
            FROM ReceivePermissions
            INNER JOIN providers ON providers.ID = ReceivePermissions.providerId
            INNER JOIN users ON users.ID = ReceivePermissions.userId
            WHERE ReceivePermissions.ID = $1
            ORDER BY ReceivePermissions.ID DESC
        `
        const result = await pool.query(query, [permissionId])
        await pool.end()

        return result.rows
    }

    async updateReceivePermissionProvider(permissionId, providerId) {

        const pool = await dbConnect()
        const query = `
            UPDATE ReceivePermissions
            SET
            ProviderId=$2
            WHERE ID = $1
        `
        const result = await pool.query(query, [permissionId, providerId])
        await pool.end()

        return true
    }

    async deleteReceivePermissionsByIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ReceivePermissions
            where
            Id IN (${placeholders})
        `
        const result = await pool.query(query, permissionsList)
        await pool.end()

        return true
    }

    async deleteReceivePermission(permissionId) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ReceivePermissions
            where
            Id = $1
        `
        const result = await pool.query(query, [permissionId])
        await pool.end()

        return true
    }

    async getReceivePermissionsAndAfterByDatetime(permissionDate) {

        const pool = await dbConnect()
        const query = `
            SELECT  *
            FROM ReceivePermissions
            WHERE
            permissionDate >= $1
        `
        const result = await pool.query(query, [permissionDate])
        await pool.end()

        return result.rows

    }

    async updateReceivePermissionTotalValue(permissionId, totalValue) {

        const pool = await dbConnect()
        const query = `
            UPDATE
            ReceivePermissions
            SET TotalValue = $2
            WHERE
            ID = $1
        `
        const result = await pool.query(query, [permissionId, totalValue])
        await pool.end()

        return result.rows
    }

    async getReceivePermissionsAfterPermissionDateThatIncludesItem(permissionDate, itemId) {

        const pool = await dbConnect()
        const query = `
        SELECT *
        FROM ReceivePermissions
        INNER JOIN ReceivePermissionsItems ON ReceivePermissionsItems.PermissionId = ReceivePermissions.ID
        WHERE
        ReceivePermissions.permissionDate > $1
        AND
        ReceivePermissionsItems.ItemId = $2
        `
        const result = await pool.query(query, [permissionDate, itemId])
        await pool.end()

        return result.rows
    }

    async getReceivePermissionsBeforePermissionDateThatIncludesItem(permissionDate, itemId) {

        const pool = await dbConnect()
        const query = `
        SELECT *
        FROM ReceivePermissions
        INNER JOIN ReceivePermissionsItems ON ReceivePermissionsItems.PermissionId = ReceivePermissions.ID
        WHERE
        ReceivePermissions.permissionDate < $1
        AND
        ReceivePermissionsItems.ItemId = $2
        `
        const result = await pool.query(query, [permissionDate, itemId])
        await pool.end()

        return result.rows
    }

    

}

module.exports = new ReceivePermission()