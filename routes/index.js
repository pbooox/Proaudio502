const { Router } = require('express');
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

//users
const userController = require('../controllers/Users/UsersController');
const authController = require('../controllers/authController');
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
// product
const productController = require('../controllers/Products/ProductsController');
// inventory
const inventoryController = require('../controllers/Inventory/InventoryController');
// store
const storeController = require('../controllers/Inventory/StoreController');


module.exports = () => {
    router.get('/', (req, res) => {
        res.send('funciona');
    });

    // auth
    router.post('/login', authController.login);
    router.post('/logout', authController.logout);

    // users
    router.get('/users/list', userController.list);
    router.post('/users/create', userController.create);
    router.put('/users/activate', userController.activate);
    router.put('/users/deactivate', userController.deactivate);
    router.put('/users/update', userController.update);

    //employees
    router.post('/employees/create', employeeController.create);
    router.get('/employees/list', employeeController.list);
    router.put('/employees/activate', employeeController.activate);
    router.put('/employees/deactivate', employeeController.deactivate);
    router.put('/employees/update', employeeController.update);
    router.get('/employees/get', employeeController.getEmployees);

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
    router.get('/type/get', typeController.get)
    router.put('/type/activate', typeController.activate);
    router.put('/type/deactivate', typeController.deactivate);
    router.put('/type/update', typeController.update);

    // brand
    router.post('/brand/create', brandController.create);
    router.get('/brand/list', brandController.list);
    router.get('/brand/get', brandController.get)
    router.put('/brand/activate', brandController.activate);
    router.put('/brand/deactivate', brandController.deactivate);
    router.put('/brand/update', brandController.update);

    // product
    router.post('/product/create', productController.create);
    router.get('/product/list', productController.list);
    router.put('/product/update', productController.update);
    router.put('/product/activate', productController.activate);
    router.put('/product/deactivate', productController.deactivate)
    router.get('/product/searchSelect', productController.searchSelect);

    // inventory
    router.post('/inventory/create', inventoryController.create);
    router.get('/inventory/list', inventoryController.list);
    router.put('/inventory/update', inventoryController.update);
    router.put('/inventory/deactivate', inventoryController.deactivate)
    router.put('/inventory/activate', inventoryController.activate);

    // Store
    router.post('/store/create', storeController.create);
    router.get('/store/list', storeController.list);
    router.put('/store/update', storeController.update);
    router.put('/store/deactivate', storeController.deactivate)
    router.put('/store/activate', storeController.activate);
    router.get('/store/getStores', storeController.get)
    return router
}