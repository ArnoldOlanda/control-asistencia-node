const dbConnection = require("../config/dbConnection");
const conn = dbConnection();

class Empleado {
  listar(response, username) {
    let data = [];
    conn.query("CALL listarEmpleados;", (err, results1) => {
      if (err) throw err;
      else {
        data.push(results1[0]);
        response.render("empleado", {
          data: data,
          nombreUsuario: username,
          page: "",
        });
      }
    });
  }

  consulta(response, dni) {
    conn.query("CALL sp_busca_empleado(?)", [dni], (err, results) => {
      if (err) throw err;
      else response.json(results[0]);
    });
  }

  activar(response, dni) {
    conn.query("UPDATE empleado set estado=1 where dni=?", [dni], (err) => {
      if (err) throw err;
      else response.redirect("/dashboard/mantenimientoEmpleado");
    });
  }

  desactivar(response, dni) {
    conn.query("UPDATE empleado set estado=0 where dni=?", [dni], (err) => {
      if (err) throw err;
      else response.redirect("/dashboard/mantenimientoEmpleado");
    });
  }

  registrarActualizar(response, data) {
    conn.query(
      `CALL sp_inserta_actualiza_empleado(?,?,?,?,?,?,?,?,?,?,?,?)`,
      data,
      (err) => {
        if (err) throw err;
        else response.redirect("/dashboard/mantenimientoEmpleado");
      }
    );
  }

  formData(response) {
    conn.query("CALL datosParaCrearEmpleado;", (err, results) => {
      if (err) throw err;
      else {
        data.push(results[0]);
        data.push(results[1]);
        data.push(results[2]);
        response.json(data);
      }
    });
  }
}

module.exports = Empleado;
