//jshint esversion:6
//express ejs bodyparser
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: "our little secret",
  resave: false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser:true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",userSchema);



app.get("/", function(req,res){
  res.render("home");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.post("/register", function(req,res){


});

app.post("/login",function(req,res){


});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
