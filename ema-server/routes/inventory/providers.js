const router = require('express').Router()
const providerController = require('../../controllers/inventory/provider')

router.post('/providers', (request, response) => providerController.addProvider(request, response))

router.get('/providers', (request, response) => providerController.getProviders(request, response))

module.exports = router