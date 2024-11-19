const path= require('path');
const fs= require('fs');

const db_archivo_directorio = path.join(__dirname, '../DataBase/ConsolasBD.json');

const ObtenerConsolas = () =>
{
    try
    {
        let lista = require(db_archivo_directorio);
        return lista.Consolas;
    }
    catch(error)
    {
        return error;
    }
}

module.exports = {
    ObtenerConsolas
}