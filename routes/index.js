const { Router } = require('express');
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

//users
const userController = require('../controllers/Users/UsersController');

//employees
const employeeController = require('../controllers/Employees/EmployeesController');
// customers
const customerController = require('../controllers/Customers/CustomersController');
// provider
const providerController = require('../controllers/Providers/ProvidersController');
// type 
const typeController = require('../controllers/Products/TypesController');
// brand
const brandController = require('../controllers/Products/BrandsController')



module.exports = () => {
    router.get('/', (req, res) => {
        res.send('funciona');
    });

    // users
    router.get('/users/list', userController.list);


    //employees
    router.post('/employees/create', employeeController.create);
    router.get('/employees/list', employeeController.list);
    router.put('/employees/activate', employeeController.activate);
    router.put('/employees/deactivate', employeeController.deactivate);
    router.put('/employees/update', employeeController.update);

    // customers
    router.post('/customers/create', customerController.create);
    router.get('/customers/list', customerController.list);
    router.put('/customers/activate', customerController.activate);
    router.put('/customers/deactivate', customerController.deactivate);
    router.put('/customers/update', customerController.update);
    
    // provider
    router.post('/providers/create', providerController.create);
    router.get('/providers/list', providerController.list);
    router.put('/providers/activate', providerController.activate);
    router.put('/providers/deactivate', providerController.deactivate);
    router.put('/providers/update', providerController.update);

    // type
    router.post('/type/create', typeController.create);
    router.get('/type/list', typeController.list);
    router.put('/type/activate', typeController.activate);
    router.put('/type/deactivate', typeController.deactivate);
    router.put('/type/update', typeController.update);

    // brand
    router.post('/brand/create', brandController.create);
    router.get('/brand/list', brandController.list);
    router.put('/brand/activate', brandController.activate);
    router.put('/brand/deactivate', brandController.deactivate);
    router.put('/brand/update', brandController.update);
    return router
}