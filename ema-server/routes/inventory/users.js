const router = require('express').Router()
const usersController = require('../../controllers/inventory/users')

router.post('/users', (request, response) => usersController.addUser(request, response))

router.get('/users', (request, response) => usersController.getUsers(request, response))

router.get('/users/employees', (request, response) => usersController.getEmployees(request, response))

router.get('/users/admins', (request, response) => usersController.getAdmins(request, response))

router.put('/users/employees/:employeeId', (request, response) => usersController.updateEmployee(request, response))

router.patch('/users/employees/:employeeId/block', (request, response) => usersController.blockEmployee(request, response))

router.patch('/users/employees/:employeeId/enable', (request, response) => usersController.enableEmployee(request, response))

router.delete('/users/employees/:employeeId', (request, response) => usersController.deleteEmployee(request, response))

module.exports = router