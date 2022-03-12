//Importaciones necesarias
const express = require('express');
const cors = require('cors');
var app = express();

//Importaciones de rutas
const usuarioRutas = require('./src/routes/usuario.routes')
const categoriaRutas = require('./src/routes/categorias.routes')
const productoRutas = require('./src/routes/producto.routes')
const carritoRutas = require('./src/routes/carrito.routes')
const facturaRutas = require('./src/routes/factura.routes')

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cabeceras
app.use(cors());

//Carga de rutas
app.use('/api', usuarioRutas, categoriaRutas, productoRutas, carritoRutas, facturaRutas);

//Exportaciones
module.exports = app;