const dbConnection = require("../../config/dbConnection");
const conn = dbConnection();

module.exports = {
  listar: (req, res) => {
    let data = [];
    if (req.session.username) { //valida sesion activa
      username=req.session.username
      conn.query("CALL listarEmpleados;", (err, results1) => {
        if (err) throw err;
        else {
          data.push(results1[0]);
          res.render("empleado", { data: data,nombreUsuario: username, page: "" });
        }
      });
    } else res.redirect("/login");
  },
  consulta:(req,res)=>{
    const {dni} = req.params
    conn.query("CALL sp_busca_empleado(?)",[dni],(err,results)=>{
      if(err) throw err
      else res.json(results[0])
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
  registrarActualizar: (req, res) => {
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
    data.push(req.body.accion);
    console.log(req.body)
    conn.query(
       `CALL sp_inserta_actualiza_empleado(?,?,?,?,?,?,?,?,?,?,?,?)`,
       data,
       (err, results) => {
         if (err) throw err;
         else res.redirect("/dashboard/mantenimientoEmpleado");
       }
    );
    
  },
  formData:(req,res)=>{
    data=[]
    if(req.session.username){
      conn.query("CALL datosParaCrearEmpleado;", (err, results) => {
        if (err) throw err;
        else {
          data.push(results[0]);
          data.push(results[1]);
          data.push(results[2]);
          res.json(data);
        }
      })
    }else res.redirect("/login");
  }
};
