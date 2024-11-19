const accesoBD = require("../DataBase/VideoJuegos");


const ObtenerVideoJuegos = (req, res) =>
{
    const detalle = accesoBD.ObtenerVideoJuegos();

    const DetalleRespuesta = 
    {
        Codigo : 0,
        Descripcion: "Transacción Exitosa",
        Detalle: detalle
    }

    res.send(DetalleRespuesta);
}


module.exports = {
    ObtenerVideoJuegos
};
