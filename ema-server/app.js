const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const config = require('./config/config')
const cors = require('cors')


app = express()

// Middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Routes

app.use('/api/auth', require('./routes/auth'))

app.use('/api/inventory', require('./routes/inventory/items'))
app.use('/api/inventory', require('./routes/inventory/providers'))
app.use('/api/inventory', require('./routes/inventory/users'))
app.use('/api/inventory', require('./routes/inventory/permissions'))
app.use('/api/inventory', require('./routes/inventory/client'))

app.get('/', (request, response) => {


    return response.status(200).json({
        accepted: true,
        message: 'welcome to EMA server'
    })
})


app.listen(5000, () => console.log(`EMA server started on port ${5000}`))