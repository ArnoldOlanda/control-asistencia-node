const { Router } = require("express");
const loginRouter = Router();
const {verifyLogin} = require('../controllers/loginController')

loginRouter.get('/',(req,res)=>{
    res.render("login", { messageError: {},page:"login" });
})

loginRouter.post("/verifyLogin", verifyLogin);


module.exports = loginRouter;