const express = require('express');
const carritoController = require('../controllers/carrito.controller')
const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')
const api = express.Router();

api.post('/agregarCarrito' ,[md_autenticacion.Auth, md_roles.verClientes], carritoController.agregarProductos)
api.delete('/eliminarCarrito', [md_autenticacion.Auth, md_roles.verClientes], carritoController.eliminarCarrito)

module.exports = api;