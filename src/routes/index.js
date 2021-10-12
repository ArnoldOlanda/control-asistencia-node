const express = require("express");
const router = express.Router();
const controlAsistenciaRouter = require ('./controlAsistencia')
const dashboardRouter=require('./dashboard')
const loginRouter=require('./login')

//Ruta principal
router.get("/", (req, res) => {
  res.render("index", { appname: "Sistema de asistencia",page:"" });
});

//Control asistencia routes
router.use('/',controlAsistenciaRouter)

//Login routes
router.use('/login',loginRouter)
//Dashboard routes
router.use('/dashboard',dashboardRouter)



module.exports = router;
