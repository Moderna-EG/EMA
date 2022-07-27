const router = require('express').Router()
const { response, request } = require('express')
const { verify } = require('jsonwebtoken')
const permissionController = require('../../controllers/inventory/permissions')
const { verifyToken } = require('../../middlewares/verifyToken')

router.post('/receive-permissions', (request, response) => permissionController.addReceivePermission(request, response))

router.get('/receive-permissions', (request, response) => permissionController.getReceivePermissions(request, response))

router.get('/receive-permissions/users/:userId', (request, response) => permissionController.getUserReceivePermission(request, response))

router.get('/exchange-permissions', (request, response) => permissionController.getExchangePermissions(request, response))

router.post('/exchange-permissions', (request, response) => permissionController.addExchangePermission(request, response))

router.get('/exchange-permissions/users/:userId', (request, response) => permissionController.getUserExchangePermission(request, response))

router.get('/receive-permissions/:permissionId', (request, response) => permissionController.getReceivePermission(request, response))

router.get('/exchange-permissions/:permissionId', (request, response) => permissionController.getExchangePermission(request, response))

router.patch('/receive-permissions/:permissionId', (request, response) => permissionController.updateReceivePermissionProvider(request, response))

router.patch('/exchange-permissions/:permissionId', (request, response) => permissionController.updateExchangePermissionClient(request, response))

router.get('/receive-permissions/providers/:providerId', (request, response) => permissionController.getProviderPermissions(request, response))

router.get('/exchange-permissions/clients/:clientId', (request, response) => permissionController.getClientPermissions(request, response))

router.delete('/permissions/:permissionId/:permissionType', (request, response) => permissionController.deletePermissiosAndUpdateItems(request, response))



module.exports = router