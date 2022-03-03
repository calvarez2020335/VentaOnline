exports.verUsuarios = function(req, res, next) {
    if(req.user.rol !== "ROL_USUARIO") return res.status(403).send({mensaje: "Solo puede acceder EL USUARIO"})
    next();
}

exports.verAdministrador = function(req, res, next) {
    if(req.user.rol !== "ROL_ADMIN") return res.status(403).send({mensaje: "Solo puede acceder el ADMIN"})
    next();
}