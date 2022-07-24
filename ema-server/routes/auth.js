const router = require('express').Router()
const authController = require('../controllers/auth/auth')

router.post('/login', (request, response) => authController.loginUser(request, response))

router.post('/forget-password/:email', (request, response) => authController.sendForgetPasswordMail(request, response))

router.patch('/users/:userId/password', (request, response) => authController.updatePassword(request, response))

module.exports = router