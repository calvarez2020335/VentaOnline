const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacturaSchema = Schema({

    usuario: {type : Schema.Types.ObjectId, ref: 'Usuarios'},
    productos: [{
        producto: {type: Schema.Types.ObjectId, ref: 'Productos'},
        cantidad: Number,
        subTotal: Number
    }],
    total: Number,
    fecha: {type: Date, default: Date.now()}

})

module.exports = mongoose.model('Facturas', FacturaSchema)