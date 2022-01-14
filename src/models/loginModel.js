const dbConnection = require("../config/dbConnection");
const conn = dbConnection();

// conn.connect((err) => {
//   if (err) throw err;
//   else console.log("Conected to database");
// });

class Login {
  verifyLogin(request, response, user, password) {
    let validUser = true;

    //Busqueda el usuario
    conn.query(`CALL sp_busca_empleado(?)`, [user], (err, result) => {
      if (err) throw err;
      if (result[0].length < 1) {
        request.flash('messageUserNotFound', "Este usuario no existe" );
        validUser = false;
      }

      if (validUser == false) response.redirect("/login");
      else {
        //Validacion de la contraseña
        
        conn.query(`CALL sp_verifica_password(?,?)`,
          [user, password],
          (err, result) => {
            if (err) throw err;

            if (result[0].length < 1) {
              request.flash('userBadPassword', user)
              request.flash('messageBadPassword', "La contraseña no es correcta")

              response.redirect('/login');
            } else {
              request.session.username = result[0][0].nombre;
              response.redirect("/dashboard");
            }
          }
        );
      }
    });
  }
}

module.exports = Login;
