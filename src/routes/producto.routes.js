const express = require('express');
const productoController = require('../controllers/producto.controller')
const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')
const api = express.Router();

//Rutas

api.post('/agregarProducto', [md_autenticacion.Auth, md_roles.verAdministrador], productoController.agregarProducto)

module.exports = api;