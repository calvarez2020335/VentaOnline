const Productos = require("../models/producto.model");
const Categoria = require("../models/categoria.model");

function agregarProducto(req, res) {
  var parametro = req.body;
  var productosModel = new Productos();

  if (
    (parametro.nombreProducto,
    parametro.stock,
    parametro.precio,
    parametro.idCategoria)
  ) {
    productosModel.nombreProducto = parametro.nombreProducto;
    productosModel.stock = parametro.stock;
    productosModel.precio = parametro.precio;
    productosModel.idCategoria = parametro.idCategoria;

    Productos.find(
      { nombreProducto: { $regex: parametro.nombreProducto, $options: "i" } },
      (err, productoEncontrado) => {
        if (productoEncontrado.length == 0) {
          productosModel.save((err, productoGuardado) => {
            if (err)
              return res.status(403).send({ mensaje: "Error en la peticion" });
            if (!productoGuardado)
              return res
                .status(500)
                .send({ mensaje: "Error al agregar producto" });

            return res.status(200).send({ producto: productoGuardado });
          });
        } else {
          return res
            .status(500)
            .send({ mensaje: "El producto ya a sido creado" });
        }
      }
    );
  } else {
    return res
      .status(403)
      .send({ mensaje: "Debe enviar los parametros obligatorios" });
  }
}

module.exports ={
    agregarProducto
}