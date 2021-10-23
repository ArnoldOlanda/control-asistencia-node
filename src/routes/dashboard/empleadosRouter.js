const { Router } = require("express");
const router = Router();
const { listar,activar,desactivar } = require('../../controllers/dashboardController')

router.get('/',listar)
router.get('/activate/:dni',activar)
router.get('/desactive/:dni',desactivar)

module.exports=router