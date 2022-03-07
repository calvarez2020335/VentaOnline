const express = require('express');
const categoriaController = require('../controllers/categoria.controller')

const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router();

api.post('/agregarCategoria', [md_autenticacion.Auth, md_roles.verAdministrador], categoriaController.AgragarCategoria)
api.get('/Categorias', md_autenticacion.Auth, categoriaController.VerCategorias);

module.exports = api;