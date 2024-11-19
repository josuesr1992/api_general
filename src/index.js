const express = require('express');
const RouterConsolas = require('./Routes/ConsolasRoute');
const RouterVideoJuegos = require('./Routes/VideojuegosRoute');
const RouterUsuarios = require('./Routes/UsuariosRoute');
const RouterBccr = require('./Routes/BCCRRoute');
const RouterSuscriptores = require('./Routes/SuscriptoresRoute');

const app = express();
const port = 4321;

// Habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Rutas de la API
app.use("/api/route", RouterConsolas);
app.use("/api/route", RouterVideoJuegos);
app.use("/api/route", RouterUsuarios);
app.use("/api/route", RouterBccr);
app.use("/api/route/suscriptores", RouterSuscriptores);

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto:", port);
});
