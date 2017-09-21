var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

//mongoose listens to connection events
mongoose.connection.on('connected', function () {
	console.log("Connected on " + dburl);
});

mongoose.connection.on('disconnected', function () {
	console.log("Disconnected!");
});

mongoose.connection.on('error', function (err) {
	console.log("Connection error with message: " + err);
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app terminal.');
		process.exit(0);
	});
});