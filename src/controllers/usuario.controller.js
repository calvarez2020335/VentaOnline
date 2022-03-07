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
          if (err) return console.error({ mensaje: "Error en la peticion" });
          if (!usuarioGuardado)
            return console.error({ mensaje: "Error al agregar el Usuario" });

          return console.log({ usuario: usuarioGuardado });
        });
      });
    } else {
      return console.error({
        mensaje: "Este correo, ya  se encuentra utilizado",
      });
    }
  });
}

function registrarUsuarios(req, res) {
  
  var parametro = req.body;
  var usuarioModel = new Usuario();


  if (parametro.nombre && parametro.email && parametro.password) {
    usuarioModel.nombre = parametro.nombre;
    usuarioModel.email = parametro.email;
    usuarioModel.password = parametro.password;
    usuarioModel.rol = "ROL_CLIENTE";

    Usuario.find({ email: parametro.email }, (err, usuarioEncontrado) => {
      if (usuarioEncontrado.length == 0) {
        bcrypt.hash(
          parametro.password,
          null,
          null,
          (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;

            usuarioModel.save((err, usuarioGuardado) => {
              if (err)
                return res
                  .status(500)
                  .send({ mensaje: "Error en la peticion" });
              if (!usuarioGuardado)
                return res
                  .status(500)
                  .send({ mensaje: "Error al agregar Usuario" });

              return res.status(200).send({ usuario: usuarioGuardado });
            });
          }
        );
      } else {
        return res.status(500).send({ mensaje: "El correo ya esta en uso" });
      }
    });
  }else{
    return res.status(500).send({mensaje: "Debe de enviar los parametros obligatorios"})
  }

}

function cambiarRol(req, res) {
  var idUser = req.params.idUser;
  var parametros = req.body;
  var usuarioModel = new Usuario();

  Usuario.findByIdAndUpdate(idUser, parametros, { new: true }, (err, usuarioActualizado) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!usuarioActualizado)
        return res.status(500).send({ mensaje: "Error al editar el Usuario" });

      return res.status(200).send({ usuario: usuarioActualizado });
    }
  );
}

function editarUsuario(req, res) {
  var idUser = req.params.idUser;
  var parametros = req.body;    

  if ( idUser !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios'});
   
    Usuario.findByIdAndUpdate(
      req.user.sub,
      parametros,
      { new: true },
      (err, usuarioActualizado) => {
        
        if (err)
          return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!usuarioActualizado)
          return res
            .status(500)
            .send({ mensaje: "Error al editar el Usuario" });

        return res.status(200).send({ usuario: usuarioActualizado });
      }
    );
}

function Login(req, res) {
  var parametros = req.body;
  Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (usuarioEncontrado) {
      // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
      bcrypt.compare(
        parametros.password,
        usuarioEncontrado.password,
        (err, verificacionPassword) => {
          //TRUE OR FALSE
          // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
          if (verificacionPassword) {
            // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
            if (parametros.obtenerToken === "true") {
              return res
                .status(200)
                .send({ token: jwt.crearToken(usuarioEncontrado) });
            } else {
              usuarioEncontrado.password = undefined;
              return res.status(200).send({ usuario: usuarioEncontrado });
            }
          } else {
            return res
              .status(500)
              .send({ mensaje: "Las contrasena no coincide" });
          }
        }
      );
    } else {
      return res
        .status(500)
        .send({ mensaje: "Error, el correo no se encuentra registrado." });
    }
  });
}

module.exports = {
  registrarAdmin,
  registrarUsuarios,
  editarUsuario,
  cambiarRol,
  Login
};
