const path= require('path');
const fs= require('fs');

const db_archivo_directorio = path.join(__dirname, '../DataBase/UsuariosBD.json');


const ObtenerTodosUsuarios = () =>
    {
        try
        {
            let informacionPersonas = require(db_archivo_directorio);
            return informacionPersonas.Usuarios;
        }
        catch(error)
        {
            return error;
        }
    }


    module.exports = {
        ObtenerTodosUsuarios
    }