var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';


mongoose.connect(dburl);

//mongoose listens to connection events
mongoose.connection.on('connected', function () {
	console.log("Connected on " + dburl);
});

mongoose.connection.on('disconnected', function () {
	console.log("\nDisconnected!");
});

mongoose.connection.on('error', function (err) {
	console.log("Connection error with message: " + err);
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app terminal (SIGINT).');
		process.exit(0);
	});
});

//SIGTERM sent by cloud app deployment platform such as heroku OR google cloud platform
process.on('SIGTERM', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app terminal (SIGTERM).');
		process.exit(0);
	});
});

process.once('SIGUSR2', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app terminal (SIGUSR2).');
		process.kill(process.pid, 'SIGUSR2');
	});
});

//Bring Schema and Models
require('./hotels.model');
require('./users.model');