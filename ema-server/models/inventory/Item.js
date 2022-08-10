const dbConnect = require('../../config/db')

class Item {
    
    async addItem(name, code) {

        const pool = await dbConnect()
        const query = `INSERT INTO items (name, code) VALUES($1, $2)`
        const client = await pool.connect()
        const result = await client.query(query, [name, code])
        client.release()

        return true
    }

    async getItems() {
        
        const pool = await dbConnect()
        const query = `SELECT * FROM items ORDER BY ID DESC`
        const client = await pool.connect()
        const result = await client.query(query)
        client.release()

        return result.rows
    }

    async getItemById(Id) {

        const pool = await dbConnect()
        const query = `SELECT * FROM items WHERE ID=$1`
        const client = await pool.connect()
        const result = await client.query(query, [Id])
        client.release()

        return result.rows
    }

    async getItemByCode(code) {

        const pool = await dbConnect()
        const query = `SELECT * FROM items WHERE code=$1`
        const client = await pool.connect()
        const result = await client.query(query, [code])
        client.release()

        return result.rows
    }

    async getItemByName(name) {

        const pool = await dbConnect()
        const query = `SELECT * FROM items WHERE name=$1`
        const client = await pool.connect()
        const result = await client.query(query, [name])
        client.release()

        return result.rows
    }

    async updateItemQuantityById(Id, quantity) {

        const pool = await dbConnect()
        const query = `UPDATE items SET quantity=$2 WHERE ID = $1`
        const client = await pool.connect()
        const result = await client.query(query, [Id, quantity])
        client.release()

        return true

    }

    async updateItemById(itemId, itemName, itemCode) {

        const pool = await dbConnect()
        const query = `UPDATE items SET name=$2, code=$3 WHERE ID = $1`
        const client = await pool.connect()
        const result = await client.query(query, [itemId, itemName, itemCode])
        client.release()

        return true
    }

    async deleteItem(itemId) {

        const pool = await dbConnect()
        const query = `DELETE FROM items WHERE Id = $1`
        const client = await pool.connect()
        const result = await client.query(query, [itemId])
        client.release()

        return true
    }

    async getItemsByIds(placeholders, itemsList) {

        const pool = await dbConnect()
        const query = `
            SELECT * FROM Items
            WHERE ID IN(${placeholders})
        `
        const client = await pool.connect()
        const result = await client.query(query, itemsList)
        client.release()

        return result.rows
    }
}

module.exports = new Item()