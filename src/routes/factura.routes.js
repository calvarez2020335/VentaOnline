const express = require('express');
const facturaControlador = require('../controllers/factura.controllers')
const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')
const api = express.Router();

//rutas

api.get('/confirmarCompra', [md_autenticacion.Auth, md_roles.verClientes], facturaControlador.confirmarCompra)
api.get('/verMisFacturas', [md_autenticacion.Auth, md_roles.verClientes], facturaControlador.vermisFacturas)
api.get('/verTodasLasFacturas', [md_autenticacion.Auth, md_roles.verAdministrador], facturaControlador.verTodasFacturas)

module.exports = api;