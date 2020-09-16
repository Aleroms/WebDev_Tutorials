const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/bmicalculator",function(request,response){
	response.sendFile(__dirname + "/bmiCalculator.html");
});

app.get("/",function(request,response){
	console.log("someone accessed root file");
	response.sendFile(__dirname + "/index.html");

});

app.post("/bmiCalculator",function(request,response){

	var weight = Number(request.body.weight);
	var height = Number(request.body.height);

	var bmi = weight / (height * height);

	response.send("your bmi is " + bmi);
});

app.get("/testing",function(request,response){
	response.send("this is a test. affirmative");
});

app.post("/",function(req,res){
	console.log(req.body);
	res.send("thanks for post");
});

app.listen(3000,function(){
	console.log("server is running on port 3000.");});
