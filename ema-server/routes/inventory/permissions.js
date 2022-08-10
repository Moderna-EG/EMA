const router = require('express').Router()
const { response, request } = require('express')
const { verify } = require('jsonwebtoken')
const permissionController = require('../../controllers/inventory/permissions')
const { adminPermission, adminAndEmployeePermission } = require('../../middlewares/verifyToken')

router.post('/receive-permissions', adminAndEmployeePermission, (request, response) => permissionController.addReceivePermission(request, response))

router.get('/receive-permissions', adminAndEmployeePermission, (request, response) => permissionController.getReceivePermissions(request, response))

router.get('/receive-permissions/users/:userId', adminAndEmployeePermission, (request, response) => permissionController.getUserReceivePermission(request, response))

router.get('/exchange-permissions', adminAndEmployeePermission, (request, response) => permissionController.getExchangePermissions(request, response))

router.post('/exchange-permissions', adminAndEmployeePermission, (request, response) => permissionController.addExchangePermission(request, response))

router.get('/exchange-permissions/users/:userId', adminAndEmployeePermission, (request, response) => permissionController.getUserExchangePermission(request, response))

router.get('/receive-permissions/:permissionId', adminAndEmployeePermission, (request, response) => permissionController.getReceivePermission(request, response))

router.get('/exchange-permissions/:permissionId', adminAndEmployeePermission, (request, response) => permissionController.getExchangePermission(request, response))

router.patch('/receive-permissions/:permissionId', adminPermission, (request, response) => permissionController.updateReceivePermissionProvider(request, response))

router.patch('/exchange-permissions/:permissionId', adminPermission, (request, response) => permissionController.updateExchangePermissionClient(request, response))

router.get('/receive-permissions/providers/:providerId', (request, response) => permissionController.getProviderPermissions(request, response))

router.get('/exchange-permissions/clients/:clientId', (request, response) => permissionController.getClientPermissions(request, response))

router.delete('/permissions/:permissionId/:permissionType', adminPermission, (request, response) => permissionController.deletePermissiosAndUpdateItems(request, response))

router.patch('/receive-permissions/receive-permissions-items/:receivePermissionItemId/quantity', adminPermission, (request, response) => permissionController.editeReceivePermissionQuantity(request, response))

router.patch('/exchange-permissions/exchange-permissions-items/:exchangePermissionItemId/quantity', adminPermission, (request, response) => permissionController.editeExchangePermissionQuantity(request, response))

router.patch('/receive-permissions/receive-permissions-items/:receivePermissionItemId/price', adminPermission, (request, response) => permissionController.editeReceivePermissionPrice(request, response))

router.delete('/receive-permissions/receive-permissions-items/:receivePermissionItemId', adminPermission, (request, response) => permissionController.deleteReceivePermissionItem(request, response))

router.delete('/exchange-permissions/exchange-permissions-items/:exchangePermissionItemId', adminPermission, (request, response) => permissionController.deleteExchangePermissionItem(request, response))

module.exports = router