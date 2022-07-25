const router = require('express').Router()
const clientController = require('../../controllers/inventory/client')

router.get('/clients', (request, response) => clientController.getClients(request,  response))

router.post('/clients', (request, response) => clientController.addClient(request,  response))

router.put('/clients/:clientId', (request, response) => clientController.updateClient(request, response))

router.delete('/clients/:clientId', (request, response) => clientController.deleteClient(request, response))

module.exports = router