const router = require('express').Router()
const providerController = require('../../controllers/inventory/provider')

router.post('/providers', (request, response) => providerController.addProvider(request, response))

router.get('/providers', (request, response) => providerController.getProviders(request, response))

router.put('/providers/:providerId', (request, response) => providerController.updateProvider(request, response))

router.delete('/providers/:providerId', (request, response) => providerController.deleteProvider(request, response))

module.exports = router