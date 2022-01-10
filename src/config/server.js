//Archivo de configuracion express

const express = require("express");
const path = require('path')
const session = require('express-session')
const cookieParser = require ('cookie-parser')
const flash = require ('connect-flash')

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"../views")); 
app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"../public")));

app.use(cookieParser('secretStringForCookies'))
app.use(session({
  secret:'secretStringForSession',
  cookie: {maxAge:3600000},
  resave:true,
  saveUninitialized:true
}))
app.use(flash());

module.exports = app