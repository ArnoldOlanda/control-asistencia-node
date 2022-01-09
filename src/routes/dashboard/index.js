const { Router } = require("express");
const dashboardRouter = Router();

const empleadosRouter = require('./empleadosRouter')
const horariosRouter = require('./horariosRouter')
const reportesRouter = require('./reportesRouter')
const estadisticasRouter= require('./estadisticasRouter')

const {calendario}=require("../../controllers/dashboard/reportesController")
dashboardRouter.get("/", (req, res) => {
  if (req.session.username) {
    const { username } = req.session;
    res.render("dashboard", { nombreUsuario: username, page: "" });
  } else {
    res.redirect("/login");
  }
});

dashboardRouter.use("/mantenimientoEmpleado", empleadosRouter);

dashboardRouter.use("/mantenimientoHorario", horariosRouter);

dashboardRouter.get("/calendario",calendario)

dashboardRouter.use("/reportes", reportesRouter);

dashboardRouter.use("/estadisticas",estadisticasRouter);

dashboardRouter.get("/logout", (req, res) => {
  if (req.session.username) req.session.destroy();
  res.redirect("/login");
});

module.exports = dashboardRouter;
