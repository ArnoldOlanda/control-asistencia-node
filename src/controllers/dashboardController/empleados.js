const dbConnection = require("../../config/dbConnection");
const conn = dbConnection();

module.exports = {
    listar: (req, res) => {
      let data=[]
      if (req.session.username) {
          conn.query("CALL listarEmpleados;",(err,results1)=>{
              if(err) throw err
              else {
                data.push(results1[0])
                conn.query("CALL datosParaCrearEmpleado",(err,results2)=>{
                  if(err) throw err
                  else {      
                    data.push(results2[0])
                    data.push(results2[1])
                    data.push(results2[2])
                    console.log(data)
                    res.render("empleado",{data:data});
                  }
                })
              }
          })
      } else res.redirect("/login");
    },
    activar: (req, res) => {
      const {dni}=req.params
      conn.query("UPDATE empleado set estado=1 where dni=?",[dni],(err,results)=>{
        if(err) throw err
        else res.redirect('/dashboard/mantenimientoEmpleado')
      })
      
    },
    desactivar:(req,res) =>{
      const {dni}=req.params
      conn.query("UPDATE empleado set estado=0 where dni=?",[dni],(err,results)=>{
        if(err) throw err
        else res.redirect('/dashboard/mantenimientoEmpleado')
      })
    },
    registrar:(req,res)=>{
      //Terminar...
    }
  };
  