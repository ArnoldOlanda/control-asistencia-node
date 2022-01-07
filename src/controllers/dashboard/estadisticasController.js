const Asistencia = require("../../models/asistenciaModel")

module.exports={
    estadisticas:(req,res)=>{
        const {username} = req.session
        if(username){
            res.render("estadisticas",{nombreUsuario:username})
        }else res.redirect('/login')
    },
    grafAsistenciaGeneralData:(req,res)=>{
        const {username}=req.session
        if(username){
            const asistencia=new Asistencia()
            asistencia.graficaAsistenciasGeneral(res)
        }else res.redirect('/login')
    },
    grafAsistenciaPorEmpleado:(req,res)=>{
        const {username}=req.session
        if(username){
            const asistencia=new Asistencia()
            asistencia.graficaAsistenciasPorEmpleado(res)
        }else res.redirect('/login')
    },
    grafAsistenciaPorMes:(req,res)=>{
        const anioActual=new Date()
        const {username}=req.session
        const anio=req.params.anio || anioActual.getFullYear() 
        if(username){
            const asistencia=new Asistencia()
            asistencia.grafAsistenciaPorMes(res,anio)
        }else res.redirect('/login')
    }
}