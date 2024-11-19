const express = require("express");
const router = express.Router();
const accesoController = require("../Controllers/BCCRIndicadorController");

router
    .get ("/ConsumirServicioBCCR", accesoController.ConsumirServicioBCCR)
   

module.exports = router;
