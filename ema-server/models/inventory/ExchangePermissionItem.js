const dbConnect = require('../../config/db')

class ExchangePermissionItem {
    
    async addExchangePermissionItem(itemId, permissionId, quantity, price, bookValue) {

        const pool = await dbConnect()
        const query = `
            INSERT INTO ExchangePermissionsItems (itemId, permissionId, quantity, price, bookValue)
            VALUES ($1, $2, $3, $4, $5)`
        const client = await pool.connect()
        const result = await client.query(query, [itemId, permissionId, quantity, price, bookValue])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionId])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [itemId, date])
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [itemId, datetime])
        client.release()

        return result.rows
    }

    async deleteExchangePermissionsItemsByPermissionIds(placeholders, permissionsList) {

        const pool = await dbConnect()
        const query = `
            DELETE FROM ExchangePermissionsItems
            WHERE
            permissionId IN (${placeholders})
                       
        `
        const client = await pool.connect()
        const result = await client.query(query, permissionsList)
        client.release()

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
        const client = await pool.connect()
        const result = await client.query(query, [permissionDate])
        client.release()

        return result.rows

    }

    

}

module.exports = new ExchangePermissionItem()