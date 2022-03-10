const express = require('express');
const categoriaController = require('../controllers/categoria.controller')
const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')
const api = express.Router();

//Rutas

api.post('/agregarCategoria', [md_autenticacion.Auth, md_roles.verAdministrador], categoriaController.agregarCategoria)
api.get('/verCategorias', md_autenticacion.Auth, categoriaController.verCategorias);
module.exports = api;