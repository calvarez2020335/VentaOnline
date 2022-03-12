const Factura = require("../models/factura.model");
const Carrito = require("../models/carritoCompras.model");
const Productos = require("../models/producto.model");

function confirmarCompra(req, res) {
  const usuarioId = req.user.sub;

  Carrito.findOne({ usuario: usuarioId }, (err, buscarProducto) => {
    if (buscarProducto == null)
      return res.status(500).send({ mensaje: "No tienes productos agregados" });
    {
        for(let carrito of buscarProducto.productos) {
            
        }
    }

  }).lean();
}
