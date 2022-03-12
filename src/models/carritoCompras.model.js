const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarritoSchema = Schema({

    usuario: {type : Schema.Types.ObjectId, ref: 'Usuarios'},
    productos:[{
        producto: {type: Schema.Types.ObjectId, ref: 'Productos'},
        cantidad: Number,
        subTotal: Number,
    }],
    total: Number
});

module.exports = mongoose.model('Carritos', CarritoSchema);