const Empleado = require("../../models/empleadoModel");

module.exports = {
  listar: (req, res) => {
    if (req.session.username) { //valida sesion activa
      username=req.session.username
      const empleado=new Empleado();
      empleado.listar(res,username);
    } else res.redirect("/login");
  },
  consulta:(req,res)=>{
    const {dni} = req.params
    const empleado=new Empleado()
    empleado.consulta(res,dni)
  },
  activar: (req, res) => {
    const { dni } = req.params;
    const empleado=new Empleado()
    empleado.activar(res,dni)
  },
  desactivar: (req, res) => {
    const { dni } = req.params;
    const empleado=new Empleado()
    empleado.desactivar(res,dni)
  },
  registrarActualizar: (req, res) => {
    let data = [];
    let {dni, nombre, apellidos, celular, correo, direccion, 
      genero, cargo, horario, contrasena, rol, accion} = req.body;

    data.push(dni,nombre,apellidos,celular,correo,direccion,genero,
      parseInt(cargo),parseInt(horario),contrasena,parseInt(rol),accion);

    const empleado=new Empleado()
    empleado.registrarActualizar(res,data);
  },
  formData:(req,res)=>{
    data=[]
    if(req.session.username){
      const empleado=new Empleado()
      empleado.formData(res)
    }else res.redirect("/login");
  }
};
