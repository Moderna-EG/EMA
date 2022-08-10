const dbConnect = require('../../config/db')

class ExchangePermission {
    
    async addExchangePermission(clientId, userId, totalValue, permissionDate) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ExchangePermissions (clientId, userId, totalValue, permissionDate)
            VALUES ($1, $2, $3, $4)`
        const client = await pool.connect()
        const result = await client.query(query, [clientId, userId, totalValue, permissionDate])
        client.release()

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
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [userId])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [clientId])
        client.release()

        return result.rows
    }

    async getExchangePermissionByMainData(clientId, userId, permissionDate) {

        const pool = await dbConnect()
        const query = `SELECT * FROM ExchangePermissions WHERE clientId=$1 AND UserId=$2 AND PermissionDate=$3`
        const client = await pool.connect()
        const result = await client.query(query, [clientId, userId, permissionDate])
        client.release()

        return result.rows
    }

    async deleteExchangePermission(Id) {

        const pool = await dbConnect()
        const query = `DELETE FROM exchangePermissions WHERE ID = $1`
        const client = await pool.connect()
        const result = await client.query(query, [Id])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionId])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionId, clientId])
        client.release()

        return true
    }

    async deleteExchangePermissionsByIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ExchangePermissions
            where
            Id IN (${placeholders})
        `
        const client = await pool.connect()
        const result = await client.query(query, permissionsList)
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionDate])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [itemId, fromDate, toDate])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionDate, itemId])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionDate, itemId])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionId, totalValue])
        client.release()

        return result.rows
    }

    async deleteExchangePermission(permissionId) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ExchangePermissions
            where
            Id = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [permissionId])
        client.release()

        return true
    }

}

module.exports = new ExchangePermission()