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
    productosModel.ventas = 0;
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

function editarProducto(req, res) {
  const productoId = req.params.idProducto;
  const parametros = req.body;

  Productos.findOneAndUpdate(
    { _id: productoId },
    parametros,
    { new: true },
    (err, productoActualizado) => {
      if (err) return res.status(403).send({ mensaje: "Error en la peticion" });
      if (!productoActualizado)
        return res
          .status(500)
          .send({ mensaje: "Error al actualizar producto" });

      return res.status(200).send({ producto: productoActualizado });
    }
  )
    .populate("idCategoria")
    .lean();
}

function eliminarProducto(req, res) {
  const productoId = req.params.idProducto;

  Productos.findOneAndDelete({ _id: productoId }, (err, productoEliminado) => {
    if(err) return res.status(403).send({ mensaje: "Error en la peticion"})
    if (!productoEliminado)
      return res.status(404).send({ mensaje: "El producto no a sido encontrado" });


    return res.status(200).send({ productoEliminado: productoEliminado });
  });
}

function verStock(req, res) {
  const productoId = req.params.id;

  Productos.findById({_id: productoId}, (err, producto) => {
    if (err) return res.status(403).send({ mensaje: "Error en la peticion" })
    if (!producto) return res.status(500).send({ mensaje: "Error al buscar el producto" });

    return res.status(200).send({stok: producto.stock})
  })
}

function editarStocks(req, res){

  const productoId = req.params.idProducto;
  const parametros = req.body;

  Productos.findByIdAndUpdate( productoId, {$set:{stock: parametros.stock} }, {new:true}, (err, actualizarStock) => {

    if(err) return res.status(403).send({ mensaje: "Error en la peticion" })
    if(!actualizarStock) return res.status(404).send({mensaje: "Error al actualizar stock" })

    return res.status(200).send({stockActualizado: actualizarStock})

  })

}

function buscarProductosXCategoria(req, res){

  const categoriaId = req.params.id;

  Productos.find({idCategoria: categoriaId}, (err, encontrado) => {

    if(encontrado.length == 0) return res.status(404).send({mensaje: "No se pudo encontrar el producto"})
    return res.status(200).send({productos: encontrado})

  }).populate('idCategoria').lean();

}

function productosMasVendidos(req, res) {
  Productos.find((err, productoMasVendidos) => {

    const productosVendidos = [];

    for(let productoMasVendido of productoMasVendidos){
      if(productoMasVendido.ventas !==0){
        productosVendidos.push(productoMasVendido)
      }
    }
    if(productosVendidos.length == 0) return res.status(500).send({mensaje: "Este producto no se a vendido"})
    return res.status(200).send({producto: productosVendidos})

  }).sort({ventas: -1}).populate('idCategoria').lean();
}

function productosAgotados(req, res) {

  Productos.find({stock:0}, (err, productoAgotado) => {

    if(productoAgotado.length == 0) return res.status(403).send({mensaje: "Todavia hay existencia"})
    return res.status(200).send({productoAgotado: productoAgotado})

  }).populate('idCategoria').lean();

}

function buscarProductoNombre(req, res){
  var nombreProducto = req.params.nombre;

  Productos.find({nombreProducto:{$regex : nombreProducto, $options: "i" }}, (err, productoEncontrado) => {

    if(!productoEncontrado) return res.status(400).send({mensaje: "No encontrado"})
    if(err) return res.status(500).send({mensaje: "Error en la peticion"})

    return res.status(200).send({Producto: productoEncontrado})
  }).populate('idCategoria').lean();

}

function verProductos(req, res) {

  Productos.find({}, (err, productosEncontrados) => {
    return res.status(200).send({Producto: productosEncontrados})
  }).populate('idCategoria').lean();

}

module.exports = {
  agregarProducto,
  editarProducto,
  eliminarProducto,
  verStock,
  editarStocks,
  buscarProductosXCategoria,
  productosMasVendidos,
  productosAgotados,
  buscarProductoNombre,
  verProductos
};
