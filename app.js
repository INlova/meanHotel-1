var express = require('express');
var app = express();

app.set('port', 3000);

var server = app.listen(app.get('port'), function(){
	var port = server.address().port; //pointing to the port given in the arg
	console.log('Magic happend on port ' + port);
});
console.log("Loading...")