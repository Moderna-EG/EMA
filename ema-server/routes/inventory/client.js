const router = require('express').Router()
const clientController = require('../../controllers/inventory/client')
const { adminPermission, adminAndEmployeePermission } = require('../../middlewares/verifyToken')

router.get('/clients', adminAndEmployeePermission, (request, response) => clientController.getClients(request,  response))

router.post('/clients', adminAndEmployeePermission, (request, response) => clientController.addClient(request,  response))

router.put('/clients/:clientId', adminAndEmployeePermission, (request, response) => clientController.updateClient(request, response))

router.delete('/clients/:clientId', adminAndEmployeePermission, (request, response) => clientController.deleteClient(request, response))

router.get('/clients/:clientId/stats', adminAndEmployeePermission, (request, response) => clientController.getClientItemsStats(request, response))

router.get('/clients/:clientId/stats/:fromDate/:toDate', adminAndEmployeePermission, (request, response) => clientController.getClientItemsStatsByDates(request, response))


module.exports = router