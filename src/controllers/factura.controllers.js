const Factura = require("../models/factura.model");
const Carrito = require("../models/carritoCompras.model");
const Productos = require("../models/producto.model");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const doc = new PDFDocument();

function confirmarCompra(req, res) {
  const usuarioId = req.user.sub;

  Carrito.findOne({ usuario: usuarioId }, (err, buscarCarrito) => {
    if (buscarCarrito == null)
      return res.status(500).send({ mensaje: "No tienes productos agregados" });
    {
      

      for (let carrito of buscarCarrito.productos) {
        Productos.findOne({ _id: carrito.producto._id }, (err, productoId) => {
          const cantidad = carrito.cantidad;
          const data = {
            stock: productoId.stock,
            ventas: productoId.ventas,
          };

          data.stock = productoId.stock - cantidad;
          data.ventas = productoId.ventas + cantidad;
          Productos.findOneAndUpdate(
            { _id: carrito.producto._id },
            data,
            { new: true },
            (err, actualizarProducto) => {}
          ).lean();
        }).lean();
      }
      const factura = new Factura(buscarCarrito);
      factura.save((err, guardado) => {
        Carrito.findOneAndDelete(
          { usuario: usuarioId },
          (err, eliminarCarrito) => {
            return res.status(200).send({ factura: factura });
          }
        );
      });
    }
  }).lean();
}

function vermisFacturas(req, res) {
  var usuarioId = req.user.sub;

  Factura.find({ usuario: usuarioId }, (err, facturaEncontrada) => {
    if (facturaEncontrada.length == 0)
      return res
        .status(404)
        .send({ mensaje: "Usted no a hecho ninguna compra" });
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!facturaEncontrada)
      return res
        .status(500)
        .send({ mensaje: "...Ups parace que algo salio mal" });
    return res.status(200).send({ Compras: facturaEncontrada });
  })
    .populate("productos.producto")
    .lean();
}

function verTodasFacturas(req, res) {
  Factura.find({}, (err, buscarFacturas) => {
    if (buscarFacturas.length == 0)
      return res.status(404).send({ mensaje: "No se han relizado compras" });
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!buscarFacturas)
      return res.status(500).send({ mensaje: "Error al encontrar facturas" });

    return res.status(200).send({ Compras: buscarFacturas });
  })
    .populate("productos.producto")
    .lean();
}

module.exports = {
  confirmarCompra,
  vermisFacturas,
  verTodasFacturas,
};
