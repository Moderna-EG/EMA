const dbConnect = require('../../config/db')

class Client {
    
    async addClient(name, description, code, operationDate) {

        const pool = await dbConnect()
        const query = `INSERT INTO clients (name, description, code, operationDate) VALUES($1, $2, $3, $4)`
        const client = await pool.connect()
        const result = await client.query(query, [name, description, code, operationDate])
        client.release()

        return true
    }

    async getClients() {
        
        const pool = await dbConnect()
        const query = `SELECT * FROM clients`
        const client = await pool.connect()
        const result = await client.query(query)
        client.release()

        return result.rows
    }

    async getClientById(Id) {

        const pool = await dbConnect()
        const query = `SELECT * FROM clients WHERE ID=$1`
        const client = await pool.connect()
        const result = await client.query(query, [Id])
        client.release()

        return result.rows
    }

    async getClientByCode(code) {

        const pool = await dbConnect()
        const query = `SELECT * FROM clients WHERE code=$1`
        const client = await pool.connect()
        const result = await client.query(query, [code])
        client.release()

        return result.rows
    }

    async getClientByName(name) {

        const pool = await dbConnect()
        const query = `SELECT * FROM clients WHERE name=$1`
        const client = await pool.connect()
        const result = await client.query(query, [name])
        client.release()

        return result.rows
    }

    async updateClientById(clientId, clientName, clientCode, clientDescription, clientOperationDate) {

        const pool = await dbConnect()
        const query = `UPDATE clients SET name=$2, code=$3, description=$4, OperationDate=$5 WHERE ID = $1`
        const client = await pool.connect()
        const result = await client.query(query, [clientId, clientName, clientCode, clientDescription, clientOperationDate])
        client.release()

        return true
    }

    async deleteClient(clientId) {

        const pool = await dbConnect()
        const query = `DELETE FROM clients WHERE Id = $1`
        const client = await pool.connect()
        const result = await client.query(query, [clientId])
        client.release()

        return true
    }


}

module.exports = new Client()