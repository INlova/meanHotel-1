// seperate instance of the connection but has the same state and got the connection
var dbConnection = require('../data/dbConnection.js');
var hotelData = require('../data/hotel-data.json');
var ObjectId = require('mongodb').ObjectId;

module.exports.getAllHotels = function(req, res) {

	var db = dbConnection.get();

	var collection = db.collection('hotels');

	var offset = 0;
	var count = 5;

	//limit method returns the number of documents to be returned
	//skip method returns how many document to skip before returning a result

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	collection
	  .find()
	  .skip(offset)
	  .limit(count)
	  .toArray(function(err, docs) {
		console.log("Found hotels", docs);
		res
		  .status(200)
		  .json(docs);
	});
};

module.exports.getHotel = function(req, res) {
	var db = dbConnection.get();
	var collection = db.collection('hotels');

	var hotelId = req.params.hotelId;
	console.log("GET hotelId", hotelId);

	collection
	  .findOne({
	  	_id : ObjectId(hotelId)
	  }, function (err, doc) {
	  	res
		  .status(200)
		  .json(doc);
	  });
};

module.exports.addHotel = function(req, res) {
	console.log("POST new Hotel");
	console.log(req.body);
	res
	  .status(200)
	  .json(req.body);
};