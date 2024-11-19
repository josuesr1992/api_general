const express = require("express");
const router = express.Router();
const accesoController = require("../Controllers/UsuariosController");

router
    .post("/ValidarCredenciales", accesoController.ValidarCredencialesLogin)
   

module.exports = router;
