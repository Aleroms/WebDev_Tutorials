const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",(req,res) => {
	req.body.newItem;
});

app.get("/", (req,res) => {

	var d = new Date();
	var options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};
	var day = d.toLocaleDateString("en-US",options);
	
	res.render("list",{kindOfDay: day});
});

app.listen(3000,function(){
	console.log("server on port 3000");
});
