const router = require('express').Router()
const clientController = require('../../controllers/inventory/client')

router.get('/clients', (request, response) => clientController.getClients(request,  response))

router.post('/clients', (request, response) => clientController.addClient(request,  response))

module.exports = router