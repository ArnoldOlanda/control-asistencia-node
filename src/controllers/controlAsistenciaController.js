const Asistencia = require("../models/asistenciaModel");

module.exports = {
  index: (req, res) => {
    const message= req.flash('message')
    res.render("index", { message, appname: "Sistema de asistencia", page: "",errmsg:"" });
  },
  marcar: (req, res) => {
    let { dni } = req.body;
    const asistencia=new Asistencia()
    asistencia.marcar(req, res, dni);
  },
};
