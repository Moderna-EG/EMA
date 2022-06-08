const router = require('express').Router()
const { response, request } = require('express')
const permissionController = require('../../controllers/inventory/permissions')
const { verifyToken } = require('../../middlewares/verifyToken')

router.post('/receive-permissions', verifyToken, (request, response) => permissionController.addReceivePermission(request, response))

router.get('/receive-permissions', verifyToken, (request, response) => permissionController.getReceivePermissions(request, response))

router.get('/exchange-permissions', verifyToken, (request, response) => permissionController.getExchangePermissions(request, response))

router.post('/exchange-permissions', verifyToken, (request, response) => permissionController.addExchangePermission(request, response))

module.exports = router