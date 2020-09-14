const express = require("express");

const app = express();//best practice to use app to refer to express

app.get('/',function(request,response){
	response.send("Hello");
});

app.get("/contact",function(request,response){
	response.send("contact me at the moon base");
});

app.get("/about",function(request,response){
	response.send("I am a senior studying computer science");
});

app.listen(3000, function(){
console.log("server started");});
