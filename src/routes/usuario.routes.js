const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller')

const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router();

api.post('/registrarCliente', [md_autenticacion.Auth, md_roles.verAdministrador], usuarioControlador.registrarUsuarios);
api.post('/login', usuarioControlador.Login);
api.put('/cambiarRol/:idUser', [md_autenticacion.Auth, md_roles.verAdministrador], usuarioControlador.cambiarRol);
api.put('/editarUsuario/:idUser', md_autenticacion.Auth, usuarioControlador.editarUsuario);

module.exports = api;