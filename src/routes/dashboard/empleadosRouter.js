const { Router } = require("express");
const router = Router();
const { listar,consulta, activar,desactivar,registrarActualizar,formData } = require('../../controllers/dashboardController');


router.get('/',listar)
router.get('/detalle/:dni',consulta)
router.get('/activate/:dni',activar)
router.get('/desactive/:dni',desactivar)
router.post('/regOrUpdate',registrarActualizar)
//Peticiones fetch
router.get('/formData',formData)

module.exports=router