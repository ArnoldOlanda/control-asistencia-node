const  Horario  = require("../../models/horarioModel");

module.exports={
    listar:(req,res)=>{
        username=req.session.username;
        const horario=new Horario();
        horario.listar(res,username);
    },
    registrarActualizar:(req,res)=>{
      let {codigo,descripcion,horaInicio,horaFin,accion}=req.body
      const horario=new Horario()
      horario.registrarActualizar(res,codigo,descripcion,horaInicio,horaFin,accion)
    },
    eliminar:(req,res)=>{
      let {codigo}=req.params
      const horario=new Horario()
      horario.eliminar(res,codigo)
    }
}