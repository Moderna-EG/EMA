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

    async getReceivePermissionsItemsById(permissionItemId) {

        const pool = await dbConnect()
        const query = `
            SELECT 
            ReceivePermissions.Id AS PermissionId, ReceivePermissionsItems.Id AS PermissionItemId,
            itemId, quantity, price, bookValue, permissionDate, userId, totalValue, providerId
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissionsItems.PermissionId = ReceivePermissions.Id
            WHERE ReceivePermissionsItems.ID = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [permissionItemId])
        client.release()

        return result.rows
    }   

    async updateReceivePermissionsItemQuantityAndBookValueById(permissionItemId, quantity, bookValue) {

        const pool = await dbConnect()
        const query = `
            UPDATE
            ReceivePermissionsItems
            SET
            quantity=$2,
            BookValue=$3
            WHERE
            ID = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [permissionItemId, quantity, bookValue])
        client.release()

        return result.rows
    }  

    async updateReceivePermissionsItemPriceAndBookValueById(permissionItemId, price, bookValue) {

        const pool = await dbConnect()
        const query = `
            UPDATE
            ReceivePermissionsItems
            SET
            price=$2,
            BookValue=$3
            WHERE
            ID = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [permissionItemId, price, bookValue])
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

    async getReceivePermissionItemsTotalPrice(permissionId) {

        const pool = await dbConnect()
        const query = `
        SELECT SUM(BookValue)
        FROM ReceivePermissionsItems
        WHERE PermissionId = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [permissionId])
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

    async getItemQuantityBeforeDatetime(itemId, datetime) {

        const pool = await dbConnect()
        const query = `
            SELECT SUM(quantity)
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.PermissionId
            WHERE ItemID = $1 AND ReceivePermissions.PermissionDate < $2
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

    async getItemsQuantityGroupedByItemIdFromDate(toDate, fromDate) {
        const pool = await dbConnect()
        const query = `
           SELECT ItemId, SUM(quantity)
           FROM ReceivePermissionsItems
           INNER JOIN ReceivePermissions ON ReceivePermissions.ID = ReceivePermissionsItems.permissionId
           WHERE
           ReceivePermissions.PermissionDate::date <= $1::date
           AND
           ReceivePermissions.PermissionDate::date >= $2::date
           GROUP BY ItemId
        `
        const client = await pool.connect()
        const result = await client.query(query, [toDate, fromDate])
        client.release()

        return result.rows
    }

    async getProviderItemsStats(providerId) {

        const pool = await dbConnect()
        const query = `
            SELECT ProviderId, ItemId, SUM(quantity) AS totalQuantity, SUM(BookValue) AS totalBookValue
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.Id = ReceivePermissionsItems.permissionId
            WHERE providerId = $1
            GROUP BY providerId, itemId
        `
        const client = await pool.connect()
        const result = await client.query(query, [providerId])
        client.release()

        return result.rows
    }

    async getProviderItemsStatsByDates(providerId, fromDate, toDate) {

        const pool = await dbConnect()
        const query = `
            SELECT ProviderId, ItemId, SUM(quantity) AS totalQuantity, SUM(BookValue) AS totalBookValue
            FROM ReceivePermissionsItems
            INNER JOIN ReceivePermissions ON ReceivePermissions.Id = ReceivePermissionsItems.permissionId
            WHERE
            providerId = $1
            AND
            permissionDate::date >= $2::date
            AND
            permissionDate::date <= $3::date
            GROUP BY providerId, itemId
        `
        const client = await pool.connect()
        const result = await client.query(query, [providerId, fromDate, toDate])
        client.release()

        return result.rows
    }

    async getItemTotalQuantity(itemId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            SUM(quantity)
            FROM ReceivePermissionsItems
            WHERE ItemId = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

        return result.rows
    }

    async deleteReceivePermissionsItemsById(itemPermissionId) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ReceivePermissionsItems
            WHERE ID = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [itemPermissionId])
        client.release()

        return result.rows
    }




}

module.exports = new ReceivePermissionItem()