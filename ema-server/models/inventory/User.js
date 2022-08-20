const dbConnect = require('../../config/db')

class User {
    
    async addUser(name, email, password, phone, role) {

        const pool = await dbConnect()
        const query = `INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5)`
        const result = await pool.query(query, [name, email, password, phone, role])
        await pool.end()

        return true
    }

    async getUsers() {
        
        const pool = await dbConnect()
        const query = `SELECT ID, name, email, phone, role, isWorking, registrationDate FROM users`
        const result = await pool.query(query)
        await pool.end()

        return result.rows
    }

    async getUsersByRole(role) {
        
        const pool = await dbConnect()
        const query = `SELECT ID, name, email, phone, role, isWorking, registrationDate FROM users WHERE role=$1`
        const result = await pool.query(query, [role])
        await pool.end()

        return result.rows
    }

    async getUserById(Id) {

        const pool = await dbConnect()
        const query = `SELECT * FROM users WHERE Id=$1`
        const result = await pool.query(query, [Id])
        await pool.end()

        return result.rows
    }

    async getUserByEmail(email) {

        const pool = await dbConnect()
        const query = `SELECT * FROM users WHERE email=$1`
        const result = await pool.query(query, [email])
        await pool.end()

        return result.rows
    }

    async getUserByPhone(phone) {

        const pool = await dbConnect()
        const query = `SELECT * FROM users WHERE phone=$1`
        const result = await pool.query(query, [phone])
        await pool.end()

        return result.rows

    }

    async updateUser(Id, name, email, phone) {

        const pool = await dbConnect()
        const query = `
        UPDATE users
        SET name=$2, email=$3, phone=$4
        WHERE Id = $1
        `
        const result = await pool.query(query, [Id, name, email, phone])
        await pool.end()

        return true
    }

    async updateUserWorking(Id, status) {

        const pool = await dbConnect()
        const query = `
        UPDATE users
        SET isWorking=$2
        WHERE Id = $1
        `
        const result = await pool.query(query, [Id, status])
        await pool.end()

        return true
    }

    async updatePassword(Id, password) {

        const pool = await dbConnect()
        const query = `
        UPDATE users
        SET password=$2
        WHERE Id = $1
        `
        const result = await pool.query(query, [Id, password])
        await pool.end()

        return true
    }

    async deleteUser(userId) {

        const pool = await dbConnect()
        const query = `DELETE FROM users WHERE Id = $1`
        const result = await pool.query(query, [userId])
        await pool.end()

        return true
    }
}

module.exports = new User()