const dbConnection = require("../config/dbConnection");
const conn = dbConnection();

module.exports = {
  index: (req, res) => {
    res.render("index", { appname: "Sistema de asistencia", page: "",errmsg:"" });
  },
  marcar: (req, res) => {
    let data = [];
    let fecha = new Date();
    let { dni } = req.body;
    let fechaActual=`${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
    let horaActual=`${fecha.getHours()}:${fecha.getMinutes()}`
    
    data.push(fechaActual); //fecha actual
    data.push(dni);
    data.push(horaActual); //hora actual

    conn.query(
      "CALL sp_obtener_horario_empleado(?);",
      [dni],
      (err, results) => {
        if (err) throw err;
        else {
          //console.log(results[0])

          const dataQuery = results[0][0].hora_inicio.split(":");
          const horaIngreso = dataQuery[0];
          const horaSalida = results[0][0].hora_fin.split(":")[0];
          let errorMessage = "";

          //validar que el empleado pertenezca al horario actual
          if (horaIngreso <= fecha.getHours() && horaSalida > fecha.getHours()) {
            let horaInicio = dataQuery[1];
            let codigoHorario = results[0][0].codigo;
            let tarde = "";
            let descuento = 0.0;

            if (fecha.getMinutes() > horaInicio) tarde = "s";
            else tarde = "n";

            if (tarde == "s") {
              let minutosTarde = fecha.getMinutes() - horaInicio;
              descuento = minutosTarde * 0.1;
            }
            data.push(codigoHorario);
            data.push(tarde);
            data.push(descuento);

            conn.query(
              "CALL sp_registrar_asistencia(?,?,?,?,?,?);",
              data,
              (err,results2) => {
                if (err) throw err;
                else
                  if(results2[0]){
                    errorMessage=results2[0][0].mensaje
                  }
                  res.render("index", {
                    appname: "Sistema de asistencia",
                    page: "",
                    errmsg: errorMessage,
                  });
              }
            );
          } else {
            errorMessage = "El empleado no pertenece a este horario";
            res.render("index", {
              appname: "Sistema de asistencia",
              page: "",
              errmsg: errorMessage,
            });
          }
        }
      }
    );
  },
};
