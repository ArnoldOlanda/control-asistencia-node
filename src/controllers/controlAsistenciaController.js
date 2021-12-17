const dbConnection = require("../config/dbConnection");
const conn = dbConnection();

module.exports = {
  index: (req, res) => {
    res.render("index", { appname: "Sistema de asistencia", page: "" });
  },
  marcar: (req, res) => {
    let data = [];
    let fecha = new Date();
    let { dni } = req.body;

    data.push(
      `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
    ); //fecha actual
    data.push(dni);
    data.push(`${fecha.getHours()}:${fecha.getMinutes()}`); //hora actual

    conn.query(
      "CALL sp_obtener_horario_empleado(?);",
      [dni],
      (err, results) => {
        if (err) throw err;
        else {
          const dataQuery = results[0][0].hora_inicio.split(":");
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
          console.log(data);
          res.redirect("/");
        }
      }
    );
  },
};
