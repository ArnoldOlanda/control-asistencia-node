const Asistencia = require("../../models/asistenciaModel");

module.exports = {
  asistenciaHoy: (req, res) => {
    const { username } = req.session;
    if (req.session.username) {
      const asistencia = new Asistencia();
      asistencia.asistenciaHoy(res, username);
    } else res.redirect("/login");
  },
  asistenciaMes: (req, res) => {
    const { username } = req.session;
    if (username) {
      const asistencia = new Asistencia();
      asistencia.asistenciaMes(res,username);
    } else res.redirect("/login");
  },
  descuentos:(req, res)=>{
    const {username}=req.session
    if(username){
      const asistencia=new Asistencia();
      asistencia.descuento(res,username);
    }else res.redirect('/login')
  },
  descuentosEmpleadoPorMes: (req,res)=>{
    const {username}=req.session
    const {mes}=req.params
    if(username){
      const asistencia=new Asistencia();
      asistencia.descuentosEmpleadoPorMes(res,username,mes)
    } else res.redirect('/login')
  }
};
