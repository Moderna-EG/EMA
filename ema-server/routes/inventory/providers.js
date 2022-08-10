const router = require('express').Router()
const providerController = require('../../controllers/inventory/provider')
const { adminPermission, adminAndEmployeePermission } = require('../../middlewares/verifyToken')

router.post('/providers', adminAndEmployeePermission, (request, response) => providerController.addProvider(request, response))

router.get('/providers', adminAndEmployeePermission, (request, response) => providerController.getProviders(request, response))

router.put('/providers/:providerId', adminAndEmployeePermission, (request, response) => providerController.updateProvider(request, response))

router.delete('/providers/:providerId', adminAndEmployeePermission, (request, response) => providerController.deleteProvider(request, response))

router.get('/providers/:providerId/stats', adminAndEmployeePermission, (request, response) => providerController.getProviderItemsStats(request, response))

router.get('/providers/:providerId/stats/:fromDate/:toDate', adminAndEmployeePermission, (request, response) => providerController.getProviderItemsStatsByDates(request, response))

module.exports = router