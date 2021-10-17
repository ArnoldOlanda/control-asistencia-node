//Archivo de configuracion express

const express = require("express");
const path = require('path')
const session = require('express-session')
const { flash } = require('express-flash-message');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"../views")); 
app.set("port", process.env.port || 4000);

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"../public")));
app.use(session({
  secret:'secret-key',
  resave:false,
  saveUninitialized:false
}))
app.use(flash({ sessionKeyName: 'flashMessage' }));

module.exports = app