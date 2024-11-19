const express = require("express");
const router = express.Router();
const accesoController = require("../Controllers/VideoJuegosController");

router.post("/ObtenerVideoJuegos", accesoController.ObtenerVideoJuegos);

module.exports = router;
