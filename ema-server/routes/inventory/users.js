const router = require('express').Router()
const usersController = require('../../controllers/inventory/users')
const { adminPermission, adminAndEmployeePermission } = require('../../middlewares/verifyToken')

router.post('/users', (request, response) => usersController.addUser(request, response))

router.get('/users', adminPermission, (request, response) => usersController.getUsers(request, response))

router.get('/users/employees', adminPermission, (request, response) => usersController.getEmployees(request, response))

router.get('/users/admins', adminPermission, (request, response) => usersController.getAdmins(request, response))

router.put('/users/employees/:employeeId', adminPermission, (request, response) => usersController.updateEmployee(request, response))

router.patch('/users/employees/:employeeId/block', adminPermission, (request, response) => usersController.blockEmployee(request, response))

router.patch('/users/employees/:employeeId/enable', adminPermission, (request, response) => usersController.enableEmployee(request, response))

router.delete('/users/employees/:employeeId', adminPermission, (request, response) => usersController.deleteEmployee(request, response))

module.exports = router