const dbConnect = require('../../config/db')

class ReceivePermissionItem {
    
    async addReceivePermissionItem(itemId, permissionId, quantity, price, bookValue) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ReceivePermissionsItems (itemId, permissionId, quantity, price, bookValue)
            VALUES ($1, $2, $3, $4, $5)`
        const client = await pool.connect()
        const result = await client.query(query, [itemId, permissionId, quantity, price, bookValue])
        client.release()

        return true
    }

    async getReceivePermissionItemById(permissionId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ReceivePermissionsItems.Id, ReceivePermissionsItems.quantity,
            ReceivePermissionsItems.price, ReceivePermissionsItems.bookValue,
            ReceivePermissionsItems.permissionId,
            items.name, items.code
            FROM ReceivePermissionsItems
            INNER JOIN items ON items.ID = ReceivePermissionsItems.itemId
            WHERE ReceivePermissionsItems.PermissionId = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [permissionId])
        client.release()

        return result.rows
    }

    async getReceivePermissionOfItem(itemId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ReceivePermissionsItems.Id, ReceivePermissionsItems.quantity AS ReceivePermissionQuantity,
            ReceivePermissionsItems.price AS ReceivePermissionPrice, ReceivePermissionsItems.bookValue AS ReceivePermissionBookValue,
            ReceivePermissionsItems.permissionId AS ReceivePermissionId, ReceivePermissionsItems.itemId AS itemId,
            items.name, items.code,
            ReceivePermissions.permissionDate, ReceivePermissions.providerId
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.permissionId
            INNER JOIN items ON items.ID = ReceivePermissionsItems.itemId
            WHERE ReceivePermissionsItems.itemId = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

        return result.rows

    }


    async getTotalQuantityOfItem(itemId) {

        const pool = await dbConnect()
        const query = `
        SELECT SUM(quantity)
        FROM ReceivePermissionsItems
        WHERE ItemID = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

        return result.rows
    }

    async getSumOfBookValueOfItem(itemId) {

        const pool = await dbConnect()
        const query = `
            SELECT SUM(BookValue)
            FROM ReceivePermissionsItems
            WHERE ItemID = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

        return result.rows
    }

}

module.exports = new ReceivePermissionItem()