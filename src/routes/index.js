const express = require("express");
const router = express.Router();
const dashboardRouter=require('./dashboard')
const loginRouter=require('./login')

//Ruta principal
router.get("/", (req, res) => {
  res.render("index", { appname: "Sistema de asistencia",page:"" });
});

//Login routes
router.use('/login',loginRouter)
//Dashboard routes
router.use('/dashboard',dashboardRouter)



module.exports = router;
