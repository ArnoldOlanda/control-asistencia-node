const { Router } = require("express");
const router = Router();
const {
  estadisticas,
  grafAsistenciaGeneralData,
  grafAsistenciaPorEmpleado,
  grafAsistenciaPorMes
} = require("../../controllers/dashboard/estadisticasController");

router.get("/", estadisticas);
router.get("/data/total", grafAsistenciaGeneralData);
router.get("/data/empleado", grafAsistenciaPorEmpleado);
router.get("/data/mes/:anio", grafAsistenciaPorMes)
module.exports = router;
