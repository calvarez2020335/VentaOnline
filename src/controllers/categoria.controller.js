const Categoria = require("../models/categoria.model");

function agregarCategoria(req, res) {
  var parametro = req.body;
  var categoriaModel = new Categoria();

  if (parametro.nombreCategoria) {
    categoriaModel.nombreCategoria = parametro.nombreCategoria;
    categoriaModel.descripcion = parametro.descripcion;

    Categoria.find(
      { nombreCategoria: { $regex: parametro.nombreCategoria, $options: "i" } },
      (err, categoriaEncontrada) => {
        if (categoriaEncontrada.length == 0) {
          categoriaModel.save((err, categoriaGuardada) => {
            if (err)
              return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!categoriaGuardada)
              return res
                .status(500)
                .send({ mensaje: "Error al agregar categoria" });

            return res.status(200).send({ categoria: categoriaGuardada });
          });
        } else {
          return res
            .status(200)
            .send({ mensaje: "La categoria ya a sido creada" });
        }
      }
    );
  } else {
    return res
      .status(403)
      .send({ mensaje: "Debe de enviar el parametro obligatorio" });
  }
}

function verCategorias(req, res) {
    Categoria.find({}, (err, categoriaEncontrada) => {
        return res.status(200).send({ Categorias: categoriaEncontrada });
    })
}

function editarCategoria(req, res){

    

}


module.exports ={
    agregarCategoria,
    verCategorias
}