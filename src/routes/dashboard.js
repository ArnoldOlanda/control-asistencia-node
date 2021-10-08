const { Router } = require("express");
const dashboardRouter = Router();

dashboardRouter.get("/", (req, res) => {
  if (req.session.username) {
    const { username } = req.session;
    //console.log(req.session.id);
    res.render("dashboard", { nombreUsuario: username, page: "" });
  } else {
    res.redirect("/login");
  }
});

dashboardRouter.get("/mantenimientoEmpleado", (req, res) => {
  res.render("empleado");
});

dashboardRouter.get("/mantenimientoUsuario", (req, res) => {
  res.send("mantenimiento usuario");
});

dashboardRouter.get("/mantenimientoHorario", (req, res) => {
  res.send("mantenimiento horario");
});

dashboardRouter.get("/calendario", (req, res) => {
  res.send("calendario");
});

dashboardRouter.get("/feriados", (req, res) => {
  res.send("feriados");
});

dashboardRouter.get("/reportes", (req, res) => {
  res.send("reportes");
});

dashboardRouter.get("/estadisticas", (req, res) => {
  res.send("estadisticas");
});

dashboardRouter.get("/logout", (req, res) => {});

module.exports = dashboardRouter;
