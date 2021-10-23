const dbConnection = require("../../config/dbConnection");
const conn = dbConnection();


conn.connect((err) => {
  if (err) throw err;
  else console.log("Conected to database");
});

module.exports = {
    listar: (req, res) => {
      if (req.session.username) {
          conn.query("CALL listarEmpleados;",(err,results)=>{
              if(err) console.log(err)
              else {
                  //console.log(results[0])
                  res.render("empleado",{data:results[0]});
              }
          })
      } else res.redirect("/login");
    },
    activar: (req, res) => {
      const {dni}=req.params
      conn.query("UPDATE empleado set estado=1 where dni=?",[dni],(err,results)=>{
        if(err) throw err
        else{
          console.log(results)
          res.redirect('/dashboard/mantenimientoEmpleado')
        }
      })
      
    },
    desactivar:(req,res) =>{
      const {dni}=req.params
      conn.query("UPDATE empleado set estado=0 where dni=?",[dni],(err,results)=>{
        if(err) throw err
        else{
          console.log(results)
          res.redirect('/dashboard/mantenimientoEmpleado')
        }
      })
    }
  };
  