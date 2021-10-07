const express = require("express");
const router=require("./routes")
const app = express();
const session = require('express-session')
const { flash } = require('express-flash-message');

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); 
app.set("port", process.env.port || 4000);

app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret:'secret-key',
  resave:false,
  saveUninitialized:false
}))
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use('/',router)

app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});