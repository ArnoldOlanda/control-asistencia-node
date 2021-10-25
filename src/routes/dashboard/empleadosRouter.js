const { Router } = require("express");
const router = Router();
const { listar,activar,desactivar,registrar } = require('../../controllers/dashboardController');


router.get('/',listar)
router.get('/activate/:dni',activar)
router.get('/desactive/:dni',desactivar)
router.post('/registrar',registrar)

module.exports=router