//Importaciones necesarias
const express = require('express');
const cors = require('cors');
var app = express();

//Importaciones de rutas
const usuarioRutas = require('./src/routes/usuario.routes')

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cabeceras
app.use(cors());

//Carga de rutas
app.use('/api', usuarioRutas);

//Exportaciones
module.exports = app;