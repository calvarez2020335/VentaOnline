const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({

    nombreProducto: String,
    stock: Number,
    precio: Number,
    ventas: Number,
    idCategoria: {type: Schema.Types.ObjectId, ref: 'Categorias'}

});

module.exports = mongoose.model('Productos', ProductoSchema);