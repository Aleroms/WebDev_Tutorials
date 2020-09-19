const express = require("express");
const app = express();
const https = require("https");
const bodyP = require("body-parser");

app.use(bodyP.urlencoded({extended: true}));
app.get("/",function(request,response){
	response.sendFile(__dirname + "/index.html");

});

app.post("/",function(request,response){
	//console.log(request.body.cityName);
	const apiKey = "19eff9b8b2c414b27f9aad01034874e9";
	const units = "imperial";
	const location = request.body.cityName;
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apiKey+"&units="+units;

	https.get(url,function(res){
		console.log(response.statusCode);

		res.on("data", (data) =>{
			//console.log(data);
			const weatherData = JSON.parse(data);
			console.log(weatherData);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

			response.write("<h1>The weather in "+ location +" is " + temp + "degrees Kelvin</h1>");
			response.write("<p>Today is " + weatherDescription);
			response.write("<img src=\""+iconURL+"\" alt=\"iconURL.png\"></img>");
			response.send();
		});


	});
});



app.listen(3000, function(){
	console.log("server is running on port 3000");
});
