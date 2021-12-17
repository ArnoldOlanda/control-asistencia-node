const express = require("express");
const router = express.Router();
const controlAsistenciaRouter = require ('./controlAsistencia')
const dashboardRouter=require('./dashboard')
const loginRouter=require('./login')


//Control asistencia routes
router.use('/',controlAsistenciaRouter)

//Login routes
router.use('/login',loginRouter)
//Dashboard routes
router.use('/dashboard',dashboardRouter)



module.exports = router;
