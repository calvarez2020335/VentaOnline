const Categoria = require("../models/categoria.model");
const Producto = require("../models/producto.model");

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

function categoriaPorDefecto(req, res) {
  var categoriaModel = new Categoria();

  categoriaModel.nombreCategoria = "POR DEFECTO";
  categoriaModel.descripcion = "Por defecto";

  Categoria.find(
    { nombreCategoria: "POR DEFECTO" },
    (err, categoriaEncontrada) => {
      if (categoriaEncontrada.length == 0) {
        categoriaModel.save((err, categoriaGuardada) => {});
      } else {
      }
    }
  );
}

function verCategorias(req, res) {
  Categoria.find({}, (err, categoriaEncontrada) => {
    return res.status(200).send({ Categorias: categoriaEncontrada });
  });
}

function verCategoriaPorId(req, res) {

  const categoriaId = req.params.id;
  Categoria.findOne({_id: categoriaId}, (err, categoriaEncontrada) => {
    if(err) return res.status(500).send({mensaje: "Error en la peticion"})
    if(!categoriaEncontrada) return res.status({mensaje: "Error al buscar la categoria"})
    return res.status(200).send({categoria: categoriaEncontrada})
  })

}

function verCategoriaNombre(req, res) {
  const nombreCategoria = req.params.nombreCategoria;

  Categoria.find({nombreCategoria: {$regex: nombreCategoria, $options: "i" }}, (err, result) => {

    if(!result) {return res.status(404).send({mensaje: "No encontrado"})}
    if(err) {return res.status(500).send({mensaje: "Error en la peticion"})}

    return res.status(200).send({categoria: result})

  })

}

function editarCategoria(req, res) {
  const idCategoria = req.params.idCateg;
  const parametro = req.body;

  Categoria.findByIdAndUpdate(
    idCategoria,
    parametro,
    { new: true },
    (err, categoriaActualizada) => {
      if (err) return res.status(403).send({ mensaje: "Error en la peticion" });
      if (!categoriaActualizada)
        return res
          .status(500)
          .send({ mensaje: "Error al editar la categoria" });

      return res.status(200).send({ categoria: categoriaActualizada });
    }
  );
}

function eliminarCategoria(req, res) {
  const categoriaId = req.params.idCategoria;

  Categoria.findOne(
    { nombreCategoria: { $regex: "POR DEFECTO", $options: "i" } },
    (err, categoriaDefault) => {
      if (categoriaDefault.id !== categoriaId) {
        Categoria.findOneAndDelete(
          { _id: categoriaId },
          (err, categoriaEliminada) => {
            if (err)
              return res.status(403).send({ mensaje: "Error en la peticion" });
            if (!categoriaEliminada)
              return res.status(403).send({ mensaje: "Error al eliminar" });
            {
              Producto.updateMany(
                { idCategoria: categoriaId },
                { idCategoria: categoriaDefault.id },
                { new: true },
                (err, productoDefault) => {
                  return res.status(200).send({ mensaje: categoriaEliminada });
                }
              );
            }
          }
        );
      } else {
        return res
          .status(500)
          .send({ mensaje: "La categoria 'Por defecto' no se puede eliminar" });
      }
    }
  );
}



module.exports = {
  agregarCategoria,
  verCategorias,
  editarCategoria,
  categoriaPorDefecto,
  eliminarCategoria,
  verCategoriaPorId,
  verCategoriaNombre
};
