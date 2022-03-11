const express = require('express');
const productoController = require('../controllers/producto.controller')
const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')
const api = express.Router();

//Rutas

api.post('/agregarProducto', [md_autenticacion.Auth, md_roles.verAdministrador], productoController.agregarProducto);
api.put('/editarProducto/:idProducto', [md_autenticacion.Auth, md_roles.verAdministrador], productoController.editarProducto)
api.delete('/eliminarProducto/:idProducto', [md_autenticacion.Auth, md_roles.verAdministrador], productoController.eliminarProducto)
api.put('/controlStock/:idProducto', [md_autenticacion.Auth, md_roles.verAdministrador], productoController.editarStocks)
api.get('/verStock/:id', md_autenticacion.Auth, productoController.verStock)
api.get('/productosXCategoria/:id', md_autenticacion.Auth, productoController.buscarProductosXCategoria)
api.get('/productoMasVendido', md_autenticacion.Auth, productoController.productosMasVendidos)
api.get('/productoAgotado', md_autenticacion.Auth, productoController.productosAgotados)
api.get('/productoXnombre/:nombre', md_autenticacion.Auth, productoController.buscarProductoNombre)
api.get('/todosLosProductos', md_autenticacion.Auth, productoController.verProductos)

module.exports = api;