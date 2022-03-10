const Categoria = require('../models/categoria.model');
const jwt = require('../services/jwt')

function agregarCategoria(req, res) {
    var parametro = req.body;
    var categoriaModel = new Categoria();

    if(parametro.nombreCategoria){
        categoriaModel.nombreCategoria = parametro.nombreCategoria;
        categoriaModel.descripcion = parametro.descripcion;

        Categoria.find({})



    }else{
        return res.status(403).send({mensaje: "Debe de enviar el parametro obligatorio"});
    }
}