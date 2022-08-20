const dbConnect = require('../../config/db')

class ExchangePermission {
    
    async addExchangePermission(clientId, userId, totalValue, permissionDate) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ExchangePermissions (clientId, userId, totalValue, permissionDate)
            VALUES ($1, $2, $3, $4)`
        const result = await pool.query(query, [clientId, userId, totalValue, permissionDate])
        await pool.end()

        return true
    }

    /*async getExchangePermissions() {

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
        await pool.end()

        return data.rows
        
    }*/


    async getExchangePermissions() {

        const pool = await dbConnect()
        const query = `
            SELECT
            ExchangePermissions.ID AS PermissionId,
            clients.name AS ClientName, clients.code AS ClientCode,
            users.name AS UserName,
            ExchangePermissions.totalValue, ExchangePermissions.permissionDate
            FROM ExchangePermissions
            INNER JOIN clients ON clients.ID = ExchangePermissions.clientId
            INNER JOIN users ON users.ID = ExchangePermissions.userId
            ORDER BY ExchangePermissions.ID DESC
        `
        const result = await pool.query(query, [])
        await pool.end()

        return result.rows
    }

    async getExchangePermissionsByUser(userId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ExchangePermissions.ID AS PermissionId,
            clients.name AS ClientName, clients.code AS ClientCode,
            users.name AS UserName,
            ExchangePermissions.totalValue, ExchangePermissions.permissionDate
            FROM ExchangePermissions
            INNER JOIN clients ON clients.ID = ExchangePermissions.clientId
            INNER JOIN users ON users.ID = ExchangePermissions.userId
            WHERE ExchangePermissions.userId = $1
            ORDER BY ExchangePermissions.ID DESC
        `
        const result = await pool.query(query, [userId])
        await pool.end()

        return result.rows
    }

    async getExchangePermissionsByClient(clientId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ExchangePermissions.ID AS PermissionId,
            clients.name AS ClientName, clients.code AS ClientCode,
            users.name AS UserName,
            ExchangePermissions.totalValue, ExchangePermissions.permissionDate
            FROM ExchangePermissions
            INNER JOIN clients ON clients.ID = ExchangePermissions.clientId
            INNER JOIN users ON users.ID = ExchangePermissions.userId
            WHERE ExchangePermissions.clientId = $1
            ORDER BY ExchangePermissions.ID DESC
        `
        const result = await pool.query(query, [clientId])
        await pool.end()

        return result.rows
    }

    async getExchangePermissionByMainData(clientId, userId, permissionDate) {

        const pool = await dbConnect()
        const query = `SELECT * FROM ExchangePermissions WHERE clientId=$1 AND UserId=$2 AND PermissionDate=$3`
        const result = await pool.query(query, [clientId, userId, permissionDate])
        await pool.end()

        return result.rows
    }

    async deleteExchangePermission(Id) {

        const pool = await dbConnect()
        const query = `DELETE FROM exchangePermissions WHERE ID = $1`
        const result = await pool.query(query, [Id])
        await pool.end()

        return true
    }

    async getExchangePermission(permissionId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ExchangePermissions.ID AS PermissionId,
            clients.name AS ClientName, clients.code AS ClientCode,
            users.name AS UserName,
            ExchangePermissions.totalValue, ExchangePermissions.permissionDate
            FROM ExchangePermissions
            INNER JOIN clients ON clients.ID = ExchangePermissions.clientId
            INNER JOIN users ON users.ID = ExchangePermissions.userId
            WHERE ExchangePermissions.ID = $1
            ORDER BY ExchangePermissions.ID DESC
        `
        const result = await pool.query(query, [permissionId])
        await pool.end()

        return result.rows
    }

    async updateExchangePermissionClient(permissionId, clientId) {

        const pool = await dbConnect()
        const query = `
            UPDATE ExchangePermissions
            SET
            ClientId=$2
            WHERE ID = $1
        `
        const result = await pool.query(query, [permissionId, clientId])
        await pool.end()

        return true
    }

    async deleteExchangePermissionsByIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ExchangePermissions
            where
            Id IN (${placeholders})
        `
        const result = await pool.query(query, permissionsList)
        await pool.end()

        return true
    }

    async getExchangePermissionsAndAfterByDatetime(permissionDate) {

        const pool = await dbConnect()
        const query = `
            SELECT  *
            FROM ExchangePermissions
            WHERE
            permissionDate >= $1
        `
        const result = await pool.query(query, [permissionDate])
        await pool.end()

        return result.rows

    }

    async getExchangePermissionsThatIncludesItemBetweenDates(itemId, fromDate, toDate) {

        const pool = await dbConnect()
        const query = `
            SELECT  *
            FROM ExchangePermissions
            INNER JOIN ExchangePermissionsItems ON ExchangePermissionsItems.PermissionId = ExchangePermissions.ID
            WHERE
            ItemId = $1
            AND
            PermissionDate >= $2
            AND
            PermissionDate <= $3
        `
        const result = await pool.query(query, [itemId, fromDate, toDate])
        await pool.end()

        return result.rows
    }

    async getExchangePermissionsAfterPermissionDateThatIncludesItem(permissionDate, itemId) {

        const pool = await dbConnect()
        const query = `
        SELECT *
        FROM ExchangePermissions
        INNER JOIN ExchangePermissionsItems ON ExchangePermissionsItems.PermissionId = ExchangePermissions.ID
        WHERE
        ExchangePermissions.permissionDate > $1
        AND
        ExchangePermissionsItems.ItemId = $2
        `
        const result = await pool.query(query, [permissionDate, itemId])
        await pool.end()

        return result.rows
    }

    async getExchangePermissionsBeforePermissionDateThatIncludesItem(permissionDate, itemId) {

        const pool = await dbConnect()
        const query = `
        SELECT *
        FROM ExchangePermissions
        INNER JOIN ExchangePermissionsItems ON ExchangePermissionsItems.PermissionId = ExchangePermissions.ID
        WHERE
        ExchangePermissions.permissionDate < $1
        AND
        ExchangePermissionsItems.ItemId = $2
        `
        const result = await pool.query(query, [permissionDate, itemId])
        await pool.end()

        return result.rows
    }

    async updateExchangePermissionTotalValue(permissionId, totalValue) {

        const pool = await dbConnect()
        const query = `
            UPDATE
            ExchangePermissions
            SET TotalValue = $2
            WHERE
            ID = $1
        `
        const result = await pool.query(query, [permissionId, totalValue])
        await pool.end()

        return result.rows
    }

    async deleteExchangePermission(permissionId) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ExchangePermissions
            where
            Id = $1
        `
        const result = await pool.query(query, [permissionId])
        await pool.end()

        return true
    }

}

module.exports = new ExchangePermission()