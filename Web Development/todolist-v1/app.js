//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

var items = [];
var workItems = [];

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
	//list is the ejs file
	let day = date();

	res.render("list",{listTitle: day, newItems: items});
});


app.post("/",(req,res) => {

	let item = req.body.newItem;

	//console.log(req.body.list);
	if(req.body.list === "Work"){
		workItems.push(item);
		res.redirect("/work");
	}

	//console.log("else");
	items.push(item);


	res.redirect("/");
});

app.get("/work",(req,res)=>{
	res.render("list", {listTitle: "Work", newItems: workItems});
});

app.post("/work",(req,res) => {
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
});

app.get("/about",(req,res) => {
	res.render("about");
});

app.listen(3000,function(){
	console.log("server on port 3000");
});
