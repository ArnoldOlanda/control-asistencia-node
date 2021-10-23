const { Router } = require("express");
const dashboardRouter = Router();

const empleadosRouter = require('./empleadosRouter')

dashboardRouter.get("/", (req, res) => {
  if (req.session.username) {
    const { username } = req.session;
    res.render("dashboard", { nombreUsuario: username, page: "" });
  } else {
    res.redirect("/login");
  }
});

dashboardRouter.use("/mantenimientoEmpleado", empleadosRouter);

dashboardRouter.get("/mantenimientoUsuario", (req, res) => {
  if (req.session.username) res.send("mantenimiento usuario");
  else res.redirect("/login");
});

dashboardRouter.get("/mantenimientoHorario", (req, res) => {
  if (req.session.username) res.send("mantenimiento horario");
  else res.redirect("/login");
});

dashboardRouter.get("/calendario", (req, res) => {
  if (req.session.username) res.send("calendario");
  else res.redirect("/login");
});

dashboardRouter.get("/feriados", (req, res) => {
  if (req.session.username) res.send("feriados");
  else res.redirect("/login");
});

dashboardRouter.get("/reportes", (req, res) => {
  if (req.session.username) res.send("reportes");
  else res.redirect("/login");
});

dashboardRouter.get("/estadisticas", (req, res) => {
  if (req.session.username) res.send("estadisticas");
  else res.redirect("/login");
});

dashboardRouter.get("/logout", (req, res) => {
  if (req.session.username)
    req.session.destroy(() => {
      res.redirect("/login");
    });
});

module.exports = dashboardRouter;
