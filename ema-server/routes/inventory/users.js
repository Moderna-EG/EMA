const router = require('express').Router()
const usersController = require('../../controllers/inventory/users')

router.post('/users', (request, response) => usersController.addUser(request, response))

router.get('/users', (request, response) => usersController.getUsers(request, response))

module.exports = router