const express = require('express');
const RouterConsolas = require('./Routes/ConsolasRoute');
const RouterVideoJuegos = require('./Routes/VideojuegosRoute');
const RouterUsuarios = require('./Routes/UsuariosRoute');
const RouterBccr = require('./Routes/BCCRRoute');
const RouterSuscriptores = require('./Routes/SuscriptoresRoute');

const app = express();


// Habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Rutas de la API
app.use("/api/consolas", RouterConsolas);
app.use("/api/videojuegos", RouterVideoJuegos);
app.use("/api/usuarios", RouterUsuarios);
app.use("/api/bccr", RouterBccr);
app.use("/api/suscriptores", RouterSuscriptores);

const port = process.env.PORT || 4321;

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto:", port);
});
