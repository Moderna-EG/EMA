const dbConnect = require('../../config/db')

class User {
    
    async addUser(name, email, password, phone, role) {

        const pool = await dbConnect()
        const query = `INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5)`
        const client = await pool.connect()
        const result = await client.query(query, [name, email, password, phone, role])
        client.release()

        return true
    }

    async getUsers() {
        
        const pool = await dbConnect()
        const query = `SELECT ID, name, email, phone, role, isWorking, registrationDate FROM users`
        const client = await pool.connect()
        const result = await client.query(query)
        client.release()

        return result.rows
    }

    async getUsersByRole(role) {
        
        const pool = await dbConnect()
        const query = `SELECT ID, name, email, phone, role, isWorking, registrationDate FROM users WHERE role=$1`
        const client = await pool.connect()
        const result = await client.query(query, [role])
        client.release()

        return result.rows
    }

    async getUserById(Id) {

        const pool = await dbConnect()
        const query = `SELECT * FROM users WHERE Id=$1`
        const client = await pool.connect()
        const result = await client.query(query, [Id])
        client.release()

        return result.rows
    }

    async getUserByEmail(email) {

        const pool = await dbConnect()
        const query = `SELECT * FROM users WHERE email=$1`
        const client = await pool.connect()
        const result = await client.query(query, [email])
        client.release()

        return result.rows
    }

    async getUserByPhone(phone) {

        const pool = await dbConnect()
        const query = `SELECT * FROM users WHERE phone=$1`
        const client = await pool.connect()
        const result = await client.query(query, [phone])
        client.release()

        return result.rows

    }

    async updateUser(Id, name, email, phone) {

        const pool = await dbConnect()
        const query = `
        UPDATE users
        SET name=$2, email=$3, phone=$4
        WHERE Id = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [Id, name, email, phone])
        client.release()

        return true
    }

    async updateUserWorking(Id, status) {

        const pool = await dbConnect()
        const query = `
        UPDATE users
        SET isWorking=$2
        WHERE Id = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [Id, status])
        client.release()

        return true
    }

    async updatePassword(Id, password) {

        const pool = await dbConnect()
        const query = `
        UPDATE users
        SET password=$2
        WHERE Id = $1
        `
        const client = await pool.connect()
        const result = await client.query(query, [Id, password])
        client.release()

        return true
    }

    async deleteUser(userId) {

        const pool = await dbConnect()
        const query = `DELETE FROM users WHERE Id = $1`
        const client = await pool.connect()
        const result = await client.query(query, [userId])
        client.release()

        return true
    }
}

module.exports = new User()