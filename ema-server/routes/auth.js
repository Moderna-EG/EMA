const router = require('express').Router()
const authController = require('../controllers/auth/auth')

router.post('/login', (request, response) => authController.loginUser(request, response))

module.exports = router