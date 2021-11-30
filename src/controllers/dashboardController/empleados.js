const dbConnection = require("../../config/dbConnection");
const conn = dbConnection();

module.exports = {
  listar: (req, res) => {
    let data = [];
    if (req.session.username) { //valida sesion activa
      conn.query("CALL listarEmpleados;", (err, results1) => {
        if (err) throw err;
        else {
          data.push(results1[0]);
          conn.query("CALL datosParaCrearEmpleado", (err, results2) => {
            if (err) throw err;
            else {
              data.push(results2[0]);
              data.push(results2[1]);
              data.push(results2[2]);
              res.render("empleado", { data: data });
            }
          });
        }
      });
    } else res.redirect("/login");
  },
  consulta:(req,res)=>{
    const {dni} = req.params
    conn.query("CALL sp_busca_empleado(?)",[dni],(err,results)=>{
      if(err) throw err
      else {
        //console.log(results[0])
        res.json({data:results[0]})
      }
    })
  },
  activar: (req, res) => {
    const { dni } = req.params;
    conn.query(
      "UPDATE empleado set estado=1 where dni=?",
      [dni],
      (err, results) => {
        if (err) throw err;
        else res.redirect("/dashboard/mantenimientoEmpleado");
      }
    );
  },
  desactivar: (req, res) => {
    const { dni } = req.params;
    conn.query(
      "UPDATE empleado set estado=0 where dni=?",
      [dni],
      (err, results) => {
        if (err) throw err;
        else res.redirect("/dashboard/mantenimientoEmpleado");
      }
    );
  },
  registrar: (req, res) => {
    let data = [];
    data.push(req.body.dni);
    data.push(req.body.nombre);
    data.push(req.body.apellidos);
    data.push(req.body.celular);
    data.push(req.body.correo);
    data.push(req.body.direccion);
    data.push(req.body.genero);
    data.push(parseInt(req.body.cargo));
    data.push(parseInt(req.body.horario));
    data.push(req.body.contrasena);
    data.push(parseInt(req.body.rol));
    console.log(data);

    conn.query(
      `insert into empleado
        (dni,nombre,apellidos,celular,correo,direccion,genero,cod_cargo,cod_horario,contrasena,tipo_usu) 
        values (?,?,?,?,?,?,?,?,?,?,?);`,
      data,
      (err, results) => {
        if (err) throw err;
        else res.redirect("/dashboard/mantenimientoEmpleado");
      }
    );
  },
};
