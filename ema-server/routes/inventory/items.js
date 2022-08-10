const router = require('express').Router()
const itemController = require('../../controllers/inventory/items')
const { adminPermission, adminAndEmployeePermission } = require('../../middlewares/verifyToken')

router.get('/items', adminAndEmployeePermission, (request, response) => itemController.getItems(request, response))

router.post('/items', adminAndEmployeePermission, (request, response) => itemController.addItem(request, response))

router.get('/items/:itemId', adminAndEmployeePermission, (request, response) => itemController.getItem(request, response))

router.get('/items/:itemId/average-price', adminAndEmployeePermission, (request, response) => itemController.getItemAveragePrice(request, response))

router.get('/items/:itemId/item-card', adminAndEmployeePermission, (request, response) => itemController.getItemCard(request, response))

router.put('/items/:itemId', adminAndEmployeePermission, (request, response) => itemController.updateItem(request, response))

router.delete('/items/:itemId', adminAndEmployeePermission, (request, response) => itemController.deleteItem(request, response))

router.get('/items/received/quantity/:fromDate/:toDate', adminAndEmployeePermission, (request, response) => itemController.getReceivedItemsQuantityByDate(request, response))

router.get('/items/exchanged/quantity/:fromDate/:toDate', adminAndEmployeePermission, (request, response) => itemController.getExchangedItemsQuantityByDate(request, response))


module.exports = router