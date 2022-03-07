exports.verClientes = function(req, res, next) {
    if(req.user.rol !== "ROL_CLIENTE") return res.status(403).send({mensaje: "Solo puede acceder EL USUARIO"})
    next();
}

exports.verAdministrador = function(req, res, next) {
    if(req.user.rol !== "ROL_ADMIN") return res.status(403).send({mensaje: "Solo pueden acceder los administradores"})
    next();
}
