const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriSchema = Schema({
    nombre: String
})

module.exports = mongoose.model('Categorias', categoriSchema)