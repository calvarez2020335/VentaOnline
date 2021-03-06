const usuarioControler = require('./src/controllers/usuario.controller')
const categoriaController = require('./src/controllers/categoria.controller')
const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;

mongoose.Promise = global.Promise;                                                                  
mongoose.connect('mongodb://localhost:27017/VentaOnline', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Conectado a la base de datos.");
    usuarioControler.registrarAdmin();
    categoriaController.categoriaPorDefecto();

    app.listen(3000, function () {
        console.log("Corriendo en el puerto 3000!")
    })

}).catch(error => console.log(error));