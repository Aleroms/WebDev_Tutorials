const express = require("express");
const bodyParser = require("body-parser");
const https =require("https");
const req = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/",function(req,res){
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.userEmail;

	const data ={
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	}

	const url = "https://us2.api.mailchimp.com/3.0/lists/0ec3c4fc73";

	const options = {
		method: "POST",
		auth: "santi:0a08a82749ad41f276e322f86a205244-us2",
	};

	const jsonData = JSON.stringify(data);

	const request = https.request(url,options,function(response){
		response.on("data", function(data){
			console.log(JSON.parse(data));
		})
	});

	request.write(jsonData);

	request.end();
});


app.get("/",function(request,response){
	console.log("file being requested on port 3000");
	response.sendFile(__dirname + "/signup.html");
})
app.listen(3000,function(){
	console.log("server is running on port 3000");
});
//0a08a82749ad41f276e322f86a205244-us2
//listid: 0ec3c4fc73
