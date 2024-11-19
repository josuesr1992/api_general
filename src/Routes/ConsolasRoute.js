const express = require("express");
const router = express.Router();
const accesoController = require("../Controllers/ConsolasController");

router
    .get ("/ObtenerConsolas", accesoController.ObtenerConsolas)
   

module.exports = router;

