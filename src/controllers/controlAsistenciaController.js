const Asistencia = require("../models/asistenciaModel");

module.exports = {
  index: (req, res) => {
    res.render("index", { appname: "Sistema de asistencia", page: "",errmsg:"" });
  },
  marcar: (req, res) => {
    let { dni } = req.body;
    const asistencia=new Asistencia()
    asistencia.marcar(res,dni);
  },
};
