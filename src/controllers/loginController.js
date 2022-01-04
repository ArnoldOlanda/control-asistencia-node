const Login = require("../models/loginModel");

module.exports = {
  index: (req, res) => {
    const userBadPassword=req.flash('userBadPassword')
    const messageUserNotFound=req.flash('messageUserNotFound')
    const messageBadPassword=req.flash('messageBadPassword')

    res.render("login", { userBadPassword,messageUserNotFound,messageBadPassword, page: "login" });
  },
  verifyLogin: (req, res) => {
    const { user, password } = req.body;
    const login = new Login();
    login.verifyLogin(req, res, user, password);
  },
};
