var express = require('express');
var app = express();
var path = require('path');

app.set('port', 3000);

app.get('/', function(req, res) { //req is request obj and res is response obj
	console.log("GET the homepage");
	res
	  .status(200)
	  .sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/json', function(req, res) {
	console.log("GET the json");
	res
	  .status(200)
	  .json( {"jsonData":true} );
});

app.get('/file', function(req, res) {
	console.log("GET the file");
	res
	  .status(200)
	  .sendFile(path.join(__dirname, 'app.js')); //pass file with path
});

var server = app.listen(app.get('port'), function(){
	var port = server.address().port; //pointing to the port given in the arg
	console.log('Magic happend on port ' + port);
});
console.log("Loading...");