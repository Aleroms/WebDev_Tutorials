module.exports.getDate = function(){

  	var d = new Date();
  	var options = {
  		weekday: "long",
  		day: "numeric",
  		month: "long"
  	};
  	return d.toLocaleDateString("en-US",options);

}
