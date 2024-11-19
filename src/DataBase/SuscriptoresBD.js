const path = require('path');
const fs = require('fs');

const dbArchivoDirectorio = path.join(__dirname, 'SuscriptoresBD.json');

// Función para obtener todos los suscriptores
const ObtenerTodosLosSuscriptores = () => {
    try {
        let informacionSuscriptor = require(dbArchivoDirectorio);
        return informacionSuscriptor.Suscriptores;
    } catch (error) {
        console.error("Error al obtener los suscriptores:", error);
        return [];
    }
}

// Función para guardar un nuevo suscriptor
const GuardarSuscriptores = (persona) => {
    try {
        let informacionSuscriptor = require(dbArchivoDirectorio);
        informacionSuscriptor.Suscriptores.push(persona);
        fs.writeFileSync(dbArchivoDirectorio, JSON.stringify(informacionSuscriptor, null, 2));
    } catch (error) {
        console.error("Error al guardar el suscriptor:", error);
        return error;
    }
}

module.exports = {
    ObtenerTodosLosSuscriptores,
    GuardarSuscriptores
};
