const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function registrarAdmin(req, res) {
  var usuarioModel = new Usuario();

  usuarioModel.nombre = "ADMIN";
  usuarioModel.email = "ADMIN";
  usuarioModel.rol = "ROL_ADMIN";

  Usuario.find({ email: "ADMIN" }, (err, usuarioEncontrado) => {
    if (usuarioEncontrado.length == 0) {

        bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;
    
            usuarioModel.save((err, usuarioGuardado) => {
              if (err)
                return console.error({ mensaje: "Error en la peticion" });
              if (!usuarioGuardado)
                return console.error({ mensaje: "Error al agregar el Usuario" });
    
              return console.log({ usuario: usuarioGuardado });
            });
          });

    }else{
        return console.error({ mensaje: "Este correo, ya  se encuentra utilizado" });
    }
  });
}

module.exports ={
    registrarAdmin
}