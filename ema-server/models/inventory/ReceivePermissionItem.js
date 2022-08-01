const dbConnect = require('../../config/db')
const { getReceivePermissions } = require('./ReceivePermission')

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
            items.name, items.code, items.id AS ItemId
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

    async getTotalQuantityOfItemByDate(itemId, date) {

        const pool = await dbConnect()
        const query = `
        SELECT SUM(quantity)
        FROM ReceivePermissionsItems
        INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.permissionId
        WHERE ItemId = $1 AND ReceivePermissions.PermissionDate::date <= $2::date
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId, date])
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

    async getItemQuantityByDate(itemId, date) {

        const pool = await dbConnect()
        const query = `
            SELECT SUM(quantity)
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.PermissionId
            WHERE ItemID = $1 AND ReceivePermissions.PermissionDate::date <= $2::date
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId, date])
        client.release()

        return result.rows
    }

    async getItemQuantityByDatetime(itemId, datetime) {

        const pool = await dbConnect()
        const query = `
            SELECT SUM(quantity)
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.PermissionId
            WHERE ItemID = $1 AND ReceivePermissions.PermissionDate <= $2
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId, datetime])
        client.release()

        return result.rows
    }

    async getAveragePriceOfItem(itemId) {

        const pool = await dbConnect()
        const query = `
            SELECT AVG(price)
            FROM ReceivePermissionsItems
            WHERE ItemId = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

        return result.rows
    }

    async getAveragePriceOfItemByDate(itemId, date) {

        const pool = await dbConnect()
        const query = `
            SELECT AVG(price)
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.PermissionId
            WHERE ItemId = $1 AND ReceivePermissions.PermissionDate <= $2
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId, date])
        client.release()

        return result.rows
    }

    async getAverageBookValueOfItemByDate(itemId, date) {
        
        const pool = await dbConnect()
        const query = `
            SELECT AVG(BookValue)
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.PermissionId
            WHERE ItemId = $1 AND ReceivePermissions.PermissionDate::date <= $2::date
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId, date])
        client.release()

        return result.rows
    }

    async getAverageBookValueOfItem(itemId) {

        const pool = await dbConnect()
        const query = `
            SELECT AVG(bookValue)
            FROM ReceivePermissionsItems
            WHERE ItemId = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

        return result.rows
    }

    async deleteReceivePermissionsItemsByPermissionsIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ReceivePermissionsItems
            WHERE
            permissionId IN (${placeholders})
                       
        `
        const client = await pool.connect()
        const result = await client.query(query, permissionsList)
        client.release()

        return result.rows

    }

    async getReceivePermissionsItemsPermissionAndAfterByDatetime(permissionDate) {

        const pool = await dbConnect()
        const query = `
            SELECT  *
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.Id = ReceivePermissionsItems.permissionId
            WHERE
            ReceivePermissions.permissionDate >= $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [permissionDate])
        client.release()

        return result.rows

    }

    async getItemsByPermissionsIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            SELECT
            *
            FROM ReceivePermissionsItems
            WHERE
            PermissionId IN (${placeholders})
        `
        const client = await pool.connect()
        const result = await client.query(query, permissionsList)
        client.release()

        return result.rows
    }




}

module.exports = new ReceivePermissionItem()