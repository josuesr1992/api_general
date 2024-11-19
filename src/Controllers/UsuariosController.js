const usuariosBD = require("../DataBase/UsuariosBD.js");

const ValidarCredencialesLogin = (req, res) =>
{
    const informacion = req.body;
    const todosUsuarios = usuariosBD.ObtenerTodosUsuarios();

    const existeUsuario = todosUsuarios.some(tx=> tx.usuario === informacion.usuario
                                    && tx.contrasena === informacion.contrasena);

    let codigoRespuesta = 0;
    let descripcionRespuesta = "Acceso permitido";
    let usuarioRespuesta = {usuario :"", nombre:"", rol:""}

    if(!existeUsuario)
    {
        codigoRespuesta= 99;
        descripcionRespuesta = "Acceso denegado";
    }
    else
    {
        const usuarioEncontrado = todosUsuarios.find(tx=> tx.usuario === informacion.usuario
                                            && tx.contrasena === informacion.contrasena)
        
        usuarioRespuesta.nombre = usuarioEncontrado.nombre;
        usuarioRespuesta.rol = usuarioEncontrado.rol;
        usuarioRespuesta.usuario = usuarioEncontrado.usuario;
    }

    const DetalleRespuesta = 
    {
        Codigo : codigoRespuesta,
        Descripcion: descripcionRespuesta,
        Detalle: usuarioRespuesta
    }

    res.send(DetalleRespuesta);
}

module.exports =
{
    ValidarCredencialesLogin
}