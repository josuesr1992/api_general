const accesoBD = require("../DataBase/VideoJuegos");

const ObtenerVideoJuegos = (req, res) => {
    // Leemos el id_consola desde el cuerpo de la solicitud
    const { id_consola } = req.body;

    console.log("ID Consola recibido:", id_consola);

    // Obtener la lista completa de videojuegos
    const detalle = accesoBD.ObtenerVideoJuegos();

    // Filtrar los videojuegos por consola
    const consolasFiltradas = detalle.filter(vd => vd.id_consola === id_consola);

    const DetalleRespuesta = {
        Codigo: 0,
        Descripcion: "Transacción Exitosa",
        Detalle: consolasFiltradas
    };

    // Enviar la respuesta con los videojuegos filtrados
    res.send(DetalleRespuesta);
};

module.exports = {
    ObtenerVideoJuegos
};
