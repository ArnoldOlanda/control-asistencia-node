const { Router } = require("express");
const router = Router();
const { listar,registrarActualizar,eliminar } = require('../../controllers/dashboard/horariosController');


router.get('/',listar)
router.post('/regOrUpdate',registrarActualizar)
router.get('/eliminar/:codigo',eliminar)

//Peticiones fetch
//router.get('/formData',formData)

module.exports=router