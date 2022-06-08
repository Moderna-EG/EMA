const router = require('express').Router()
const itemController = require('../../controllers/inventory/items')
const { verifyToken } = require('../../middlewares/verifyToken')

router.get('/items', (request, response) => itemController.getItems(request, response))

router.post('/items', verifyToken, (request, response) => itemController.addItem(request, response))

module.exports = router