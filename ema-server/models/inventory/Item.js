const dbConnect = require('../../config/db')

class Item {
    
    async addItem(name, code) {

        const pool = await dbConnect()
        const query = `INSERT INTO items (name, code) VALUES($1, $2)`
        const result = await pool.query(query, [name, code])
        await pool.end()

        return true
    }

    async getItems() {
        
        const pool = await dbConnect()
        const query = `SELECT * FROM items ORDER BY ID DESC`
        const result = await pool.query(query)
        await pool.end()

        return result.rows
    }

    async getItemById(Id) {

        const pool = await dbConnect()
        const query = `SELECT * FROM items WHERE ID=$1`
        const result = await pool.query(query, [Id])
        await pool.end()

        return result.rows
    }

    async getItemByCode(code) {

        const pool = await dbConnect()
        const query = `SELECT * FROM items WHERE code=$1`
        const result = await pool.query(query, [code])
        await pool.end()

        return result.rows
    }

    async getItemByName(name) {

        const pool = await dbConnect()
        const query = `SELECT * FROM items WHERE name=$1`
        const result = await pool.query(query, [name])
        await pool.end()

        return result.rows
    }

    async updateItemQuantityById(Id, quantity) {

        const pool = await dbConnect()
        const query = `UPDATE items SET quantity=$2 WHERE ID = $1`
        const result = await pool.query(query, [Id, quantity])
        await pool.end()

        return true

    }

    async updateItemById(itemId, itemName, itemCode) {

        const pool = await dbConnect()
        const query = `UPDATE items SET name=$2, code=$3 WHERE ID = $1`
        const result = await pool.query(query, [itemId, itemName, itemCode])
        await pool.end()

        return true
    }

    async deleteItem(itemId) {

        const pool = await dbConnect()
        const query = `DELETE FROM items WHERE Id = $1`
        const result = await pool.query(query, [itemId])
        await pool.end()

        return true
    }

    async getItemsByIds(placeholders, itemsList) {

        const pool = await dbConnect()
        const query = `
            SELECT * FROM Items
            WHERE ID IN(${placeholders})
        `
        const result = await pool.query(query, itemsList)
        await pool.end()

        return result.rows
    }
}

module.exports = new Item()