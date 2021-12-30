const Login = require("../models/loginModel");

module.exports = {
  verifyLogin: (req, res) => {
    const { user, password } = req.body;
    const login=new Login()
    login.verifyLogin(req,res,user,password);
  }
};