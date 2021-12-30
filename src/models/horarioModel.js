const dbConnection = require("../config/dbConnection");
const conn = dbConnection();

class Horario{
    registrarActualizar(response,codigo,descripcion,horaInicio,horaFin,accion){
        conn.query("CALL sp_inserta_actualiza_horario(?,?,?,?,?)",[parseInt(codigo),descripcion,horaInicio,horaFin,accion],(err)=>{
            if(err) throw err;
            else response.redirect('/dashboard/mantenimientoHorario')
        })
    }

    listar(response,username){
        conn.query("CALL sp_lista_horarios;", (err, results) => {
            if (err) throw err;
            else {
              response.render("horario", { data: results[0],nombreUsuario: username, page: "" });
            }
        });
    }

    eliminar(response,codigo){
        conn.query("CALL sp_eliminar_horario(?)",[parseInt(codigo)],(err)=>{
            if(err) throw err
            else response.redirect('/dashboard/mantenimientoHorario')
        })
    }
}

module.exports = Horario