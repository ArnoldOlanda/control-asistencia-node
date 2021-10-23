const dbConnection = require("../config/dbConnection");
const conn = dbConnection();

conn.connect((err) => {
  if (err) throw err;
  else console.log("Conected to database");
});

module.exports = {
  verifyLogin: (req, res) => {
    const { user, password } = req.body;
    let message = {};
    let validUser=true

    //Busqueda el usuario
    conn.query(
      `select nombre from empleado where usuario='${user}'`,
      (err, result) => {
        if (err) throw err;
        if (result.length<1) {
          message = { messageUserNotFound: "Este usuario no existe" };
          validUser = false;
        }

        if (validUser == false) {
          res.render("login", { messageError: message, page: "login" });
        } else {
          //Validacion de la contraseña
          conn.query(
            `select nombre from empleado where usuario='${user}' and contrasena='${password}'`,
            (err, result) => {
              if (err) throw err;
              if (result.length<1) {
                message = { userBadPassword:user, messageBadPassword: "La contraseña no es correcta" };
                res.render("login", { messageError: message, page: "login" });
              }else{
                req.session.username = result[0].nombre;
                res.redirect("/dashboard");
              }
            }
          );
        }
      });
  },
  other:(req,res)=>{
  }
};