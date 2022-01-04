const { Router } = require("express");
const router = Router();
const {
  asistenciaHoy,
  asistenciaMes,
  descuentos
} = require("../../controllers/dashboard/reportesController");

router.get("/asistencia/hoy", asistenciaHoy);
router.get("/asistencia/mes", asistenciaMes);
router.get("/asistencia/descuentos",descuentos);

module.exports=router;
