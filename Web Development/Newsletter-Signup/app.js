const express = require("express");
const bodyParser = require("body-parser");
const https =require("https");
const req = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/failure", (req,res) => {
	res.redirect("/");
});

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
		auth: //commented,
	};

	const jsonData = JSON.stringify(data);

	const request = https.request(url,options,function(response){

		if(response.statusCode === 200){
			res.sendFile(__dirname + "/success.html");
		}
		else{
			res.sendFile(__dirname + "/failure.html");
		}

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
app.listen(process.env.PORT || 3000,function(){
	console.log("server is running on port 3000");
});

