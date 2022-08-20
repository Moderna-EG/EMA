const dbConnect = require('../../config/db')

class Client {
    
    async addClient(name, description, code, operationDate) {

        const pool = await dbConnect()
        const query = `INSERT INTO clients (name, description, code, operationDate) VALUES($1, $2, $3, $4)`
        const result = await pool.query(query, [name, description, code, operationDate])
        await pool.end()

        return true
    }

    async getClients() {
        
        const pool = await dbConnect()
        const query = `SELECT * FROM clients`
        const result = await pool.query(query)
        await pool.end()

        return result.rows
    }

    async getClientById(Id) {

        const pool = await dbConnect()
        const query = `SELECT * FROM clients WHERE ID=$1`
        const result = await pool.query(query, [Id])
        await pool.end()

        return result.rows
    }

    async getClientByCode(code) {

        const pool = await dbConnect()
        const query = `SELECT * FROM clients WHERE code=$1`
        const result = await pool.query(query, [code])
        await pool.end()

        return result.rows
    }

    async getClientByName(name) {

        const pool = await dbConnect()
        const query = `SELECT * FROM clients WHERE name=$1`
        const result = await pool.query(query, [name])
        await pool.end()

        return result.rows
    }

    async updateClientById(clientId, clientName, clientCode, clientDescription, clientOperationDate) {

        const pool = await dbConnect()
        const query = `UPDATE clients SET name=$2, code=$3, description=$4, OperationDate=$5 WHERE ID = $1`
        const result = await pool.query(query, [clientId, clientName, clientCode, clientDescription, clientOperationDate])
        await pool.end()

        return true
    }

    async deleteClient(clientId) {

        const pool = await dbConnect()
        const query = `DELETE FROM clients WHERE Id = $1`
        const result = await pool.query(query, [clientId])
        await pool.end()

        return true
    }


}

module.exports = new Client()