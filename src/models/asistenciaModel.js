const req = require("express/lib/request");
const dbConnection = require("../config/dbConnection");
const conn = dbConnection();

class Asistencia {
  marcar(request, response, dni) {
    let data = [];
    let fecha = new Date();

    let fechaActual = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
    let horaActual = `${fecha.getHours()}:${fecha.getMinutes()}`;

    let horarioInicio = new Date();
    let horarioFin = new Date();

    data.push(fechaActual); //fecha actual
    data.push(dni);
    data.push(horaActual); //hora actual

    conn.query(
      "CALL sp_obtener_horario_empleado(?);",
      [dni],
      (err, results) => {
        if (err) throw err;
        else {
          const dataHoraInicio = results[0][0].hora_inicio.split(":");
          const dataHoraSalida = results[0][0].hora_fin.split(":");

          const horaIngreso = dataHoraInicio[0];
          const horaSalida = dataHoraSalida[0];

          let errorMessage = "";

          horarioInicio.setHours(dataHoraInicio[0], dataHoraInicio[1], "00");
          horarioFin.setHours(dataHoraSalida[0], dataHoraSalida[1], "00");

          let diferenciaMinutosIngreso = parseInt(
            (fecha - horarioInicio) / 60000
          );
          let diferenciaMinutosSalida = parseInt((fecha - horarioFin) / 60000);

          //validar que el empleado pertenezca al horario actual
          if (
            parseInt(horaIngreso) - 1 <= fecha.getHours() &&
            parseInt(horaSalida) + 1 >= fecha.getHours()
          ) {
            let tarde = "n";
            let descuento = 0.0;
            let codigoHorario = results[0][0].codigo;

            if (diferenciaMinutosIngreso <= 0) {
              tarde = "n";
            } else if (
              diferenciaMinutosIngreso > 0 &&
              diferenciaMinutosIngreso <= 30
            ) {
              //Validar que la hora de tardanza no sea mayor a 1/2 hora(30 min)
              tarde = "s";
              descuento = diferenciaMinutos * 0.1;
            } else if (
              diferenciaMinutosIngreso > 30 &&
              diferenciaMinutosSalida < 0
            ) {
              conn.query(
                "CALL sp_registrar_falta(?,?,?)",
                [fechaActual, dni, codigoHorario],
                (err, results) => {
                  if (err) throw err;
                  else {
                    errorMessage = results[0][0].mensaje;
                    request.flash('message',errorMessage)
                    response.redirect("/")                   
                  }
                }
              );
              return;
            }
            data.push(codigoHorario);
            data.push(tarde);
            data.push(descuento);

            conn.query(
              "CALL sp_registrar_asistencia(?,?,?,?,?,?);",
              data,
              (err, results2) => {
                if (err) throw err;
                else {
                  errorMessage = results2[0][0].mensaje;
                  request.flash('message',errorMessage)
                  response.redirect("/")
                }
              }
            );
          } else {
            errorMessage = "El empleado no pertenece a este horario";
            request.flash('message',errorMessage)
            response.redirect("/")
          }
        }
      }
    );
  }

  asistenciaHoy(response,username){
    conn.query("CALL sp_lista_asistencias_hoy",(err,results)=>{
      if (err) throw err
      else {
        const data=results[0]
        response.render("asistenciaHoy",{data,nombreUsuario:username})
      }
    })
  }
  
  asistenciaMes(response,username){
    conn.query("CALL sp_lista_asistencias_ultimo_mes",(err,results)=>{
      if (err) throw err
      else {
        const data=results[0]
        response.render("asistenciaMes",{data,nombreUsuario:username})
      }
    })
  }
  descuento(response,username){
    conn.query("CALL sp_lista_meses_descuento",(err,results)=>{
      if(err) throw err
      else{
        //console.log(results[0])
        const data=results[0]
        response.render("descuentos",{nombreUsuario:username,data})
      }
    })
  }
  descuentosEmpleadoPorMes(response,username,mes){
    conn.query("CALL sp_lista_descuentos_agrupado_por_empleado(?)",[mes],(err,results)=>{
      if (err) throw err
      else{
        response.json(results[0])
      }
    })
  }
}

module.exports = Asistencia;
