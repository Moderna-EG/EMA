const router = require('express').Router()
const itemController = require('../../controllers/inventory/items')
const { verifyToken } = require('../../middlewares/verifyToken')

router.get('/items', (request, response) => itemController.getItems(request, response))

router.post('/items', (request, response) => itemController.addItem(request, response))

router.get('/items/:itemId', (request, response) => itemController.getItem(request, response))

router.get('/items/:itemId/average-price', (request, response) => itemController.getItemAveragePrice(request, response))

router.get('/items/:itemId/item-card', (request, response) => itemController.getItemCard(request, response))

router.put('/items/:itemId', (request, response) => itemController.updateItem(request, response))

router.delete('/items/:itemId', (request, response) => itemController.deleteItem(request, response))

module.exports = router