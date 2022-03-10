const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = Schema({

    nombreCategoria: String,
    descripcion: String,

})

module.exports = mongoose.model('Categorias', CategoriaSchema);