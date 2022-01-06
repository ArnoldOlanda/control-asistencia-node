const { Router } = require("express");
const router = Router();
const {
  asistenciaHoy,
  asistenciaMes,
  descuentos,
  descuentosEmpleadoPorMes
} = require("../../controllers/dashboard/reportesController");

router.get("/asistencia/hoy", asistenciaHoy);
router.get("/asistencia/mes", asistenciaMes);
router.get("/asistencia/descuentos",descuentos);
router.get("/asistencia/descuentos/mes/:mes",descuentosEmpleadoPorMes)

module.exports=router;
