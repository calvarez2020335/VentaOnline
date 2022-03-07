const Categoria = require('../models/categoria.model')
const jwt = require("../services/jwt");

function AgragarCategoria(req, res) {

    var parametros = req.body;
    var categoriaModel = new Categoria();

    if(parametros.nombre){
        categoriaModel.nombre = parametros.nombre;

        Categoria.find({nombre: parametros.nombre}, (err, categoriaEncontrada) => {
            if(categoriaEncontrada.length == 0){
                categoriaModel.save((err, categoriaGuardada) => {
                  if (err)
                    return res
                      .status(500)
                      .send({ mensaje: "Error en la petición." });
                  if (!categoriaGuardada)
                    return res
                      .status(500)
                      .send({ mensaje: "Error al agregar la categoria" });

                      return res.status(200).send({categoria: categoriaGuardada});
                })
            }else{
                return res.status(500).send({mensaje: "La categoria ya a sido creada"})
            }
        })

    }else{
        return res.status(500).send({mensaje: "Debe enviar los parametros obligatorios"})
    }

}

function VerCategorias(req, res) {

    Categoria.find({}, (err, category) => {
        return res.send({categorias: category})
    })

}

function editarCategorias(req, res) {

    const categoriaId = req.params.idCategoria;
    const parametros = req.body;

    Categoria.find({_id: categoriaId}, (err, categoriaEncontrada) => {
        
    })

}
module.exports ={
    AgragarCategoria,
    VerCategorias
}