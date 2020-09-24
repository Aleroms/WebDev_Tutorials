const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine','ejs');

app.get("/", (req,res) => {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var d = new Date();
	var dayName = days[d.getDay()];


	// if(today.getDay() === 6 || today.getDay() === 0){
	// 	day = "weekend";
	// }
	// else{
	// 	day = "weekday";
	// }
	res.render("list",{kindOfDay: dayName});
});

app.listen(3000,function(){
	console.log("server on port 3000");
});
