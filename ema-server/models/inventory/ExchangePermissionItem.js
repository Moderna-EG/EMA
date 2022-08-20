const dbConnect = require('../../config/db')

class ExchangePermissionItem {
    
    async addExchangePermissionItem(itemId, permissionId, quantity, price, bookValue) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ExchangePermissionsItems (itemId, permissionId, quantity, price, bookValue)
            VALUES ($1, $2, $3, $4, $5)`
        const result = await pool.query(query, [itemId, permissionId, quantity, price, bookValue])
        await pool.end()

        return true
    }

    async getExchangePermissionItemById(permissionId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ExchangePermissionsItems.Id, ExchangePermissionsItems.quantity,
            ExchangePermissionsItems.price, ExchangePermissionsItems.bookValue,
            ExchangePermissionsItems.permissionId,
            items.name, items.code
            FROM ExchangePermissionsItems
            INNER JOIN items ON items.ID = ExchangePermissionsItems.itemId
            WHERE ExchangePermissionsItems.PermissionId = $1
        `
        const result = await pool.query(query, [permissionId])
        await pool.end()

        return result.rows
    }

    async getExchangePermissionsItemsById(permissionItemId) {

        const pool = await dbConnect()
        const query = `
            SELECT 
            ExchangePermissions.Id AS PermissionId, ExchangePermissionsItems.Id AS PermissionItemId,
            itemId, quantity, price, bookValue, permissionDate, userId, totalValue, clientId
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissionsItems.PermissionId = ExchangePermissions.Id
            WHERE ExchangePermissionsItems.ID = $1
        `
        const result = await pool.query(query, [permissionItemId])
        await pool.end()

        return result.rows
    }  

    async updateExchangePermissionsItemQuantityAndBookValueById(permissionItemId, quantity, bookValue) {

        const pool = await dbConnect()
        const query = `
            UPDATE
            ExchangePermissionsItems
            SET
            quantity=$2,
            BookValue=$3
            WHERE
            ID = $1
        `
        const result = await pool.query(query, [permissionItemId, quantity, bookValue])
        await pool.end()

        return result.rows
    }

    async updateExchangePermissionsItemPriceAndBookValueById(permissionItemId, price, bookValue) {

        const pool = await dbConnect()
        const query = `
            UPDATE
            ExchangePermissionsItems
            SET
            price=$2,
            BookValue=$3
            WHERE
            ID = $1
        `
        const result = await pool.query(query, [permissionItemId, price, bookValue])
        await pool.end()

        return result.rows
    }
    
    async getExchangePermissionItemsTotalPrice(permissionId) {

        const pool = await dbConnect()
        const query = `
        SELECT SUM(BookValue)
        FROM ExchangePermissionsItems
        WHERE PermissionId = $1
        `
        const result = await pool.query(query, [permissionId])
        await pool.end()

        return result.rows
    }


    async getExchangePermissionOfItem(itemId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            ExchangePermissionsItems.Id, ExchangePermissionsItems.quantity AS exchangepermissionquantity,
            ExchangePermissionsItems.price AS exchangepermissionprice, ExchangePermissionsItems.bookValue AS exchangepermissionbookvalue,
            ExchangePermissionsItems.permissionId AS ExchangePermissionId, ExchangePermissionsItems.itemId AS itemId,
            items.name, items.code,
            ExchangePermissions.permissionDate, ExchangePermissions.clientId
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissions.ID = ExchangePermissionsItems.permissionId
            INNER JOIN items ON items.ID = ExchangePermissionsItems.itemId
            WHERE ExchangePermissionsItems.itemId = $1
        `
        const result = await pool.query(query, [itemId])
        await pool.end()

        return result.rows
    }

    async getItemQuantityByDate(itemId, date) {

        const pool = await dbConnect()
        const query = `
            SELECT SUM(quantity)
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissions.ID = ExchangePermissionsItems.PermissionId
            WHERE ItemID = $1 AND ExchangePermissions.PermissionDate::date <= $2::date
        `
        const result = await pool.query(query, [itemId, date])
        await pool.end()

        return result.rows
    }

    async getItemQuantityByDatetime(itemId, datetime) {

        const pool = await dbConnect()
        const query = `
            SELECT SUM(quantity)
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissions.ID = ExchangePermissionsItems.PermissionId
            WHERE ItemID = $1 AND ExchangePermissions.PermissionDate <= $2
        `
        const result = await pool.query(query, [itemId, datetime])
        await pool.end()

        return result.rows
    }

    async getItemQuantityBeforeDatetime(itemId, datetime) {

        const pool = await dbConnect()
        const query = `
            SELECT SUM(quantity)
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissions.ID = ExchangePermissionsItems.PermissionId
            WHERE ItemID = $1 AND ExchangePermissions.PermissionDate < $2
        `
        const result = await pool.query(query, [itemId, datetime])
        await pool.end()

        return result.rows
    }

    async deleteExchangePermissionsItemsByPermissionIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ExchangePermissionsItems
            WHERE
            permissionId IN (${placeholders})
                       
        `
        const result = await pool.query(query, permissionsList)
        await pool.end()

        return result.rows

    }

    async getExchangePermissionsItemsPermissionAndAfterByDatetime(permissionDate) {

        const pool = await dbConnect()
        const query = `
            SELECT  *
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissions.Id = ExchangePermissionsItems.permissionId
            WHERE
            ExchangePermissions.permissionDate >= $1
        `
        const result = await pool.query(query, [permissionDate])
        await pool.end()

        return result.rows

    }

    async getItemsByPermissionsIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            SELECT
            *
            FROM ExchangePermissionsItems
            WHERE
            PermissionId IN (${placeholders})
        `
        const result = await pool.query(query, permissionsList)
        await pool.end()

        return result.rows
    }

    async getItemsQuantityGroupedByItemIdFromDate(toDate, fromDate) {
        const pool = await dbConnect()
        const query = `
           SELECT ItemId, SUM(quantity)
           FROM exchangePermissionsItems
           INNER JOIN exchangePermissions ON exchangePermissionsItems.PermissionId = exchangePermissions.Id
           WHERE
           exchangePermissions.PermissionDate::date <= $1::date
           AND
           exchangePermissions.PermissionDate::date >= $2::date
           GROUP BY ItemId
        `
        const result = await pool.query(query, [toDate, fromDate])
        await pool.end()

        return result.rows
    }

    async getClientItemsStats(clientId) {

        const pool = await dbConnect()
        const query = `
            SELECT ClientId, ItemId, SUM(quantity) AS totalQuantity, SUM(BookValue) AS totalBookValue
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissions.Id = ExchangePermissionsItems.permissionId
            WHERE clientId = $1
            GROUP BY clientId, itemId
        `
        const result = await pool.query(query, [clientId])
        await pool.end()

        return result.rows
    }

    async getClientItemsStatsByDates(clientId, fromDate, toDate) {

        const pool = await dbConnect()
        const query = `
            SELECT clientId, ItemId, SUM(quantity) AS totalQuantity, SUM(BookValue) AS totalBookValue
            FROM ExchangePermissionsItems
            INNER JOIN ExchangePermissions ON ExchangePermissions.Id = ExchangePermissionsItems.permissionId
            WHERE
            clientId = $1
            AND
            permissionDate::date >= $2::date
            AND
            permissionDate::date <= $3::date
            GROUP BY clientId, itemId
        `
        const result = await pool.query(query, [clientId, fromDate, toDate])
        await pool.end()

        return result.rows
    }

    async getItemTotalQuantity(itemId) {

        const pool = await dbConnect()
        const query = `
            SELECT
            SUM(quantity)
            FROM ExchangePermissionsItems
            WHERE ItemId = $1
        `
        const result = await pool.query(query, [itemId])
        await pool.end()

        return result.rows
    }

    async deleteExchangePermissionsItemsById(itemPermissionId) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ExchangePermissionsItems
            WHERE ID = $1
        `
        const result = await pool.query(query, [itemPermissionId])
        await pool.end()

        return result.rows
    }

    

}

module.exports = new ExchangePermissionItem()