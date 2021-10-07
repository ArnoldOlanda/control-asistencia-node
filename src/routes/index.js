const express = require("express");
const router = express.Router();
const dashboardRouter=require('./dashboard')

router.get("/", (req, res) => {
  res.render("index", { appname: "Sistema de asistencia",page:"" });
});

router.get("/login", (req, res) => {
  res.render("login", { messageError: {},page:"login" });
});
router.post("/verifyLogin", (req, res) => {
  const { user, password } = req.body;
  req.session.username=user
  let message = {};
  let validLoggin = true;
  if (user != "Arnold") {
    message = { messageUserError: "Usuario no valido" };
    validLoggin = false;
  }
  if (password != "123456") {
    message = { ...message, messagePasswordError: "Password incorrecto" };
    validLoggin = false;
  }

  if (validLoggin) res.redirect("/dashboard");
  else res.render("login", { messageError: message,page:"login" });
});

router.use('/dashboard',dashboardRouter)



module.exports = router;
