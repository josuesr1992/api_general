const express = require('express');
const router = express.Router();
const SuscriptoresBD = require('../DataBase/SuscriptoresBD');

// Ruta para obtener todos los suscriptores
router.get('/', (req, res) => {
    const todosLosSuscriptores = SuscriptoresBD.ObtenerTodosLosSuscriptores();
    res.send({ DetalleRespuesta: todosLosSuscriptores });
});

// Ruta para registrar un nuevo suscriptor
router.post('/', async (req, res) => {
    const { correo, nombre, apellido, telefono } = req.body;

    // Validar que todos los campos están completos
    if (!correo || !nombre || !apellido || !telefono) {
        return res.status(400).json({ Codigo: 99, Descripcion: "Todos los campos son obligatorios" });
    }

    try {
        // Validar que no exista el suscriptor
        const suscriptores = await SuscriptoresBD.ObtenerTodosLosSuscriptores();
        const existeSuscriptor = suscriptores.some(s => s.correo === correo);

        if (existeSuscriptor) {
            return res.status(400).json({ Codigo: 98, Descripcion: "Usuario ya existe" });
        }

        // Guardar el nuevo suscriptor
        await SuscriptoresBD.GuardarSuscriptores({ correo, nombre, apellido, telefono });
        return res.status(201).json({ Codigo: 0, Descripcion: "Persona Registrada", Detalle: { correo, nombre, apellido, telefono } });
    } catch (error) {
        console.error("Error al guardar el suscriptor:", error);
        return res.status(500).json({ Codigo: 100, Descripcion: "Error interno del servidor" });
    }
});

module.exports = router;
