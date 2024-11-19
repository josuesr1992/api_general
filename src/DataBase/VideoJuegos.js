const path = require('path');
const fs = require('fs');

// Ruta al archivo JSON
const db_archivo_directorio = path.join(__dirname, '../DataBase/VideoJuegos.json');

// Función para obtener los videojuegos
const ObtenerVideoJuegos = () => {
    try {
        // Leer el archivo JSON de forma síncrona
        const rawData = fs.readFileSync(db_archivo_directorio, 'utf-8');
        
        // Parsear los datos del archivo
        const lista = JSON.parse(rawData);
        
        // Devolver la lista de videojuegos
        return lista.VideoJuegos;
    } catch (error) {
        console.error("Error al leer el archivo de videojuegos:", error);
        return [];
    }
};

module.exports = {
    ObtenerVideoJuegos
};
