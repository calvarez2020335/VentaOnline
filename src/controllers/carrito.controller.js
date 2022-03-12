const Carrito = require("../models/carritoCompras.model");
const Producto = require("../models/producto.model");

function agregarProductos(req, res) {
  const parametros = req.body;
  const usuarioId = req.user.sub;

  const data = {
    producto: parametros.producto,
    cantidad: parametros.cantidad,
  };

  Producto.findOne({ _id: data.producto }, (err, productoEncontrado) => {
    if (data.cantidad > productoEncontrado.stock)
      return res.status(500).send({ mensaje: "No hay stock" });
    {
      Carrito.findOne({ usuarioId }, (err, checkCarrito) => {
        if (!checkCarrito) {

            data.usuario = usuarioId;
            data.subTotal = (productoEncontrado.precio * data.cantidad)
            data.total = (data.subTotal)
            const carritoCompra = new Carrito(data);
            carritoCompra.save((err, guardado) => {

                Carrito.findOne({usuario: usuarioId}, (err, carritoId)=>{
                    Carrito.findOneAndUpdate({_id: carritoId._id}, {$push: {productos: data}}, {new:true}, (err, carritoGuardar)=>{

                        return res.status(200).send({carrito: carritoGuardar});

                    }).populate('productos.producto').lean();
                })

            });

        }else{

            Carrito.findOne({usuario: usuarioId}, (err, carritoId)=>{

                data.subTotal = (productoEncontrado.precio*data.cantidad);
                data.total = (data.subTotal + carritoId.total);

                Carrito.findOneAndUpdate({_id: carritoId._id}, {$push: {productos: data}, total: data.total}, {new:true}, (err, subirCarrito)=>{

                    return res.status(200).send({Carrito: subirCarrito});

                }).populate('productos.producto').lean();

            })

        }
      });
    }
  });
}

function eliminarCarrito(req, res) {
    Carrito.findOneAndDelete({usuario: req.user.sub}, (err, eliminarCarrito)=>{
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" })
        if(!eliminarCarrito) return res.status(500).send({ mensaje: "...Ups Algo salio mal"})

        return res.status(200).send({carritoEliminado: eliminarCarrito});

    }).lean();
}

module.exports = {
  agregarProductos,
  eliminarCarrito
};
