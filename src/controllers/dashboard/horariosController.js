const dbConnection = require("../../config/dbConnection");
const conn = dbConnection();

module.exports={
    listar:(req,res)=>{
        username=req.session.username
        conn.query("CALL sp_lista_horarios;", (err, results) => {
        if (err) throw err;
        else {
          res.render("horario", { data: results[0],nombreUsuario: username, page: "" });
        }
      });
    },
    registrarActualizar:(req,res)=>{
      console.log(req.body)
      let {codigo,descripcion,horaInicio,horaFin,accion}=req.body
      conn.query("CALL sp_inserta_actualiza_horario(?,?,?,?,?)",[parseInt(codigo),descripcion,horaInicio,horaFin,accion],(err)=>{
        if(err) throw err;
        else res.redirect('/dashboard/mantenimientoHorario')
      })
    },
    eliminar:(req,res)=>{
      let {codigo}=req.params
      conn.query("CALL sp_eliminar_horario(?)",[parseInt(codigo)],(err)=>{
        if(err) throw err
        else res.redirect('/dashboard/mantenimientoHorario')
      })
    }
}