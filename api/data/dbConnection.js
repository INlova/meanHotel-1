var mongoClient = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/meanhotel'; //mongodb://host:port/dbName

var connection = null;

var open = function () {
	mongoClient.connect(dbURL, function(err, db) {
		if (err) {
			console.log("Connection to database failed.");
			return;
		}

		connection = db;
		console.log("Connection to database was successful");
	});
	//set connection
};

//get the connection and return it
var get = function () {
	return connection;
};

module.exports = {
	open: open,
	get: get
};